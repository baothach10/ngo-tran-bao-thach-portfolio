import { GameObjects, Scene, Math as PhaserMath } from 'phaser';

import { isMobileDevice } from '@/utils';

export class InteractiveShapesScene extends Scene {
  private shapes: GameObjects.GameObject[] = [];
  private shapeTexts: GameObjects.Text[] = [];
  private enableWorldBounds: boolean;
  private shapeSize: number;
  private shapeLabels: string[];
  private originalColors: Map<string, number> = new Map();
  private hoverColors: Map<string, number> = new Map();
  private currentlyHovered: Phaser.Physics.Matter.Sprite | null = null;
  private currentlyTouched: Phaser.Physics.Matter.Sprite | null = null;

  // Gradual loading properties
  private gradualLoadingTimer: Phaser.Time.TimerEvent | null = null;
  private currentShapeIndex: number = 0;
  private shuffledLabels: string[] = [];
  private isCreatingShapes: boolean = false;
  private SHAPES_PER_BATCH: number = 3; // Number of shapes to create per batch
  private BATCH_DELAY: number = 100; // Delay between batches in milliseconds

  // Performance optimization properties
  private lastShapePositions: Map<number, { x: number; y: number; rotation: number }> = new Map();
  private readonly POSITION_THRESHOLD: number = 0.5; // Minimum distance to trigger text update

  constructor(
    config: {
      enableWorldBounds?: boolean;
      shapeSize?: number;
      shapeLabels?: string[];
    } = {}
  ) {
    super({ key: 'InteractiveShapesSection' });
    this.enableWorldBounds = config.enableWorldBounds ?? true;
    this.shapeSize = config.shapeSize ?? 100;
    this.shapeLabels = config.shapeLabels ?? ['C', 'S', 'H', '★'];

    // Optimize batch settings based on device capabilities
    this.optimizeBatchSettings();

    // All shapes with text are white with gray hover color
    const shapeTypes = ['circle', 'square', 'hexagon', 'rectangle'];
    shapeTypes.forEach(type => {
      this.originalColors.set(type, 0xffffff); // White
      this.hoverColors.set(type, 0x808080); // Gray

      // Colors for empty shapes (no text) - more visible colors
      this.originalColors.set(`${type}_empty`, 0xe5e7eb); // Light gray but more visible
      this.hoverColors.set(`${type}_empty`, 0x6b7280); // Medium gray
    });
  }

  private optimizeBatchSettings(): void {
    const isMobile = isMobileDevice();
    const totalShapes = this.shapeLabels.length;

    if (isMobile || totalShapes > 50) {
      // More conservative settings for mobile or large number of shapes
      this.SHAPES_PER_BATCH = 2;
      this.BATCH_DELAY = 150;
    } else if (totalShapes > 30) {
      // Medium settings for moderate number of shapes
      this.SHAPES_PER_BATCH = 3;
      this.BATCH_DELAY = 100;
    } else {
      // Default settings for smaller number of shapes
      this.SHAPES_PER_BATCH = 4;
      this.BATCH_DELAY = 80;
    }
  }

  preload() {
    // Create colored shapes using graphics for regular sizes
    this.createShapeTexture('circle', this.shapeSize);
    this.createShapeTexture('square', this.shapeSize);
    this.createShapeTexture('hexagon', this.shapeSize);
    this.createShapeTexture('rectangle', this.shapeSize);

    // Create smaller textures for empty shapes (60% size instead of 50%)
    const emptyShapeSize = Math.floor(this.shapeSize * 0.6);
    this.createShapeTexture('circle_empty', emptyShapeSize);
    this.createShapeTexture('square_empty', emptyShapeSize);
    this.createShapeTexture('hexagon_empty', emptyShapeSize);
    this.createShapeTexture('rectangle_empty', emptyShapeSize);

    this.load.font('Roboto', '/assets/fonts/Roboto-ExtraBold.ttf');
  }

  private createShapeTexture(name: string, size: number) {
    const graphics = this.add.graphics();
    // Create white texture that can be tinted
    graphics.fillStyle(0xffffff);

    // Remove _empty suffix for shape detection
    const baseShapeName = name.replace('_empty', '').replace('_hover', '');

    switch (baseShapeName) {
      case 'circle':
        graphics.fillCircle(size / 2, size / 2, size / 2);
        break;
      case 'square':
        graphics.fillRect(0, 0, size, size);
        break;
      case 'rectangle': {
        // Create a rectangle that's wider than it is tall (good for longer text)
        const rectWidth = Math.floor(size * 1.4);
        const rectHeight = Math.floor(size * 0.8);
        graphics.fillRect(0, 0, rectWidth, rectHeight);
        // Update texture generation to use the rectangle dimensions
        graphics.generateTexture(name, rectWidth, rectHeight);
        graphics.destroy();
        return; // Early return to avoid the default texture generation
      }
      case 'hexagon':
        graphics.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i * PhaserMath.PI2) / 6;
          const x = size / 2 + (size / 2) * Math.cos(angle);
          const y = size / 2 + (size / 2) * Math.sin(angle);
          if (i === 0) graphics.moveTo(x, y);
          else graphics.lineTo(x, y);
        }
        graphics.closePath();
        graphics.fillPath();
        break;
    }

    graphics.generateTexture(name, size, size);
    graphics.destroy();
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i];
      if (temp !== undefined && shuffled[j] !== undefined) {
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
      }
    }
    return shuffled;
  }

  private getShapeTypeForIndex(index: number, textLength?: number): string {
    // Use rectangle for long text (longer than 8 characters)
    if (textLength !== undefined && textLength > 8) {
      return 'rectangle';
    }

    const shapeTypes = ['circle', 'square', 'hexagon'];
    const shapeType = shapeTypes[index % shapeTypes.length];
    return shapeType!; // Non-null assertion since we know the array has elements
  }

  private createShapesForAllLabels(): void {
    if (this.shapeLabels.length === 0) {
      // Fallback to default if no labels provided
      this.shapeLabels = ['A', 'B', 'C', 'D'];
    }

    // Initialize gradual loading
    this.shuffledLabels = this.shuffleArray(this.shapeLabels);
    this.currentShapeIndex = 0;
    this.isCreatingShapes = true;

    // Start gradual shape creation
    this.startGradualShapeCreation();
  }

  private startGradualShapeCreation(): void {
    if (this.currentShapeIndex >= this.shuffledLabels.length) {
      this.isCreatingShapes = false;
      return;
    }

    // Create a batch of shapes
    const endIndex = Math.min(
      this.currentShapeIndex + this.SHAPES_PER_BATCH,
      this.shuffledLabels.length
    );

    for (let i = this.currentShapeIndex; i < endIndex; i++) {
      this.createSingleShape(i);
    }

    this.currentShapeIndex = endIndex;

    // Schedule next batch if there are more shapes to create
    if (this.currentShapeIndex < this.shuffledLabels.length) {
      this.gradualLoadingTimer = this.time.delayedCall(this.BATCH_DELAY, () => {
        this.startGradualShapeCreation();
      });
    } else {
      this.isCreatingShapes = false;
    }
  }

  private createSingleShape(index: number): void {
    const label = this.shuffledLabels[index];

    if (!label) return;

    // Check if label is empty or just whitespace
    const isEmpty = !label || label.trim() === '';
    const textLength = isEmpty ? 0 : label.trim().length;

    // Get shape type for this label (considering text length for long text)
    const baseShapeType = this.getShapeTypeForIndex(index, textLength);
    const shapeType = isEmpty ? `${baseShapeType}_empty` : baseShapeType;

    // Create shape with random starting position - adjust for empty shapes
    const margin = isEmpty ? this.shapeSize * 0.6 : this.shapeSize;
    const startX = PhaserMath.Between(margin, this.scale.width - margin);
    const startY = PhaserMath.Between(margin, this.scale.height / 2);

    const shape = this.matter.add.sprite(startX, startY, shapeType);

    // Set initial color based on whether it's empty or not
    const originalColor = this.originalColors.get(shapeType);
    if (originalColor) {
      shape.setTint(originalColor);
    }

    this.configureMatterPhysicsBody(shape, baseShapeType, isEmpty);
    this.setupShapeInteractions(shape);

    // Create text for this shape with the specific label (only if not empty)
    let textObject: GameObjects.Text | null = null;
    if (!isEmpty) {
      textObject = this.createShapeText(shape, label, index);
    }

    // Add smooth entry animation for the shape
    this.addShapeEntryAnimation(shape, textObject, isEmpty);

    this.shapes.push(shape);
    this.shapeTexts.push(textObject as GameObjects.Text); // Push null for empty shapes
  }

  private addShapeEntryAnimation(
    shape: Phaser.Physics.Matter.Sprite,
    textObject: GameObjects.Text | null,
    isEmpty: boolean = false
  ): void {
    // Start with reduced scale and alpha
    const initialScale = isEmpty ? 0.05 : 0.1; // Even smaller start for empty shapes
    const finalScale = isEmpty ? 0.6 : 1; // Smaller final scale for empty shapes

    shape.setScale(initialScale);
    shape.setAlpha(0.3);

    if (textObject) {
      textObject.setScale(initialScale);
      textObject.setAlpha(0.3);
    }

    // Animate to full size with a smooth ease
    this.tweens.add({
      targets: shape,
      scaleX: finalScale,
      scaleY: finalScale,
      alpha: isEmpty ? 0.8 : 1, // Slightly transparent for empty shapes
      duration: 300,
      ease: 'Back.easeOut'
    });

    if (textObject) {
      this.tweens.add({
        targets: textObject,
        scaleX: 1,
        scaleY: 1,
        alpha: 1,
        duration: 300,
        ease: 'Back.easeOut',
        delay: 100 // Slight delay for text to appear after shape
      });
    }
  }

  private configureMatterPhysicsBody(
    shape: Phaser.Physics.Matter.Sprite,
    shapeType: string,
    isEmpty: boolean = false
  ) {
    // Use smaller size for empty shapes but not too small
    const size = isEmpty ? this.shapeSize * 0.6 : this.shapeSize; // 60% instead of 50%

    switch (shapeType) {
      case 'circle':
        shape.setCircle(size / 2);
        break;
      case 'square':
        shape.setRectangle(size, size);
        break;
      case 'rectangle': {
        // Rectangle shape with wider dimensions for longer text
        const rectWidth = Math.floor(size * 1.4);
        const rectHeight = Math.floor(size * 0.8);
        shape.setRectangle(rectWidth, rectHeight);
        break;
      }
      case 'hexagon': {
        // Use a polygon for hexagon
        const hexVertices = [];
        for (let i = 0; i < 6; i++) {
          const angle = (i * PhaserMath.PI2) / 6;
          hexVertices.push({
            x: (size / 2) * Math.cos(angle),
            y: (size / 2) * Math.sin(angle)
          });
        }
        shape.setBody({ type: 'fromVertices', verts: hexVertices });
        break;
      }
      case 'star': {
        // Use a polygon for star
        const starVertices = [];
        for (let i = 0; i < 10; i++) {
          const angle = (i * PhaserMath.PI2) / 10;
          const radius = i % 2 === 0 ? size / 2 : size / 4;
          starVertices.push({
            x: radius * Math.cos(angle),
            y: radius * Math.sin(angle)
          });
        }
        shape.setBody({ type: 'fromVertices', verts: starVertices });
        break;
      }
      default:
        shape.setRectangle(size, size);
    }

    // Set Matter.js specific properties
    shape.setMass(PhaserMath.FloatBetween(0.8, 1.5));
    shape.setFriction(0.3);
    shape.setFrictionAir(0.02);
    shape.setBounce(PhaserMath.FloatBetween(0.3, 0.8));
  }

  private createShapeText(
    shape: Phaser.Physics.Matter.Sprite,
    text: string,
    index: number
  ): GameObjects.Text {
    // Calculate font size based on shape size and text length
    const baseSize = this.shapeSize * 0.25; // Reduced from 0.3 to 0.25 for better fit
    const textLength = text.length;

    // Adjust font size based on text length for better readability
    let fontSize: number;
    if (textLength <= 2) {
      fontSize = Math.max(10, Math.floor(baseSize)); // Short text like "JS", "A", "🚀"
    } else if (textLength <= 4) {
      fontSize = Math.max(9, Math.floor(baseSize * 0.9)); // Medium text like "HTML", "CSS"
    } else if (textLength <= 6) {
      fontSize = Math.max(8, Math.floor(baseSize * 0.75)); // Longer text like "React", "Python"
    } else if (textLength <= 10) {
      fontSize = Math.max(7, Math.floor(baseSize * 0.65)); // Long text like "JavaScript", "PostgreSQL"
    } else {
      fontSize = Math.max(6, Math.floor(baseSize * 0.5)); // Very long text
    }

    // Create text object with black text initially using Roboto font
    const textObject = this.add.text(shape.x, shape.y, text, {
      fontSize: `${fontSize}px`,
      fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
      color: '#000000', // Black text initially
      align: 'center',
      wordWrap: { width: this.shapeSize * 0.8 }, // Allow text wrapping within shape bounds
      lineSpacing: -2, // Tighter line spacing for multi-line text,
      resolution: window.devicePixelRatio || 1 // High DPI support,
    });

    // Center the text
    textObject.setOrigin(0.5, 0.5);

    // Store reference to the shape
    textObject.setData('shapeIndex', index);
    textObject.setData('parentShape', shape);

    return textObject;
  }

  private updateTextPosition(textObject: GameObjects.Text, shape: Phaser.Physics.Matter.Sprite) {
    // Update text position to match shape
    textObject.setPosition(shape.x, shape.y);
    textObject.setRotation(shape.rotation);
    textObject.setScale(shape.scaleX, shape.scaleY);
  }

  private changeShapeColor(shape: Phaser.Physics.Matter.Sprite, isHovered: boolean) {
    const shapeType = shape.texture.key;
    const shapeIndex = this.shapes.indexOf(shape);
    const textObject = this.shapeTexts[shapeIndex];

    if (isHovered) {
      // Apply gray hover color to shape
      const hoverColor = this.hoverColors.get(shapeType);
      if (hoverColor) {
        shape.setTint(hoverColor);
      }

      // Change text color to white and scale with shape
      if (textObject) {
        textObject.setStyle({
          color: '#ffffff',
          fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif'
        });
      }
    } else {
      // Reset to white color for shape
      const originalColor = this.originalColors.get(shapeType);
      if (originalColor) {
        shape.setTint(originalColor);
      }

      // Reset text color to black and scale
      if (textObject) {
        textObject.setStyle({
          color: '#000000',
          fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif'
        });
      }
    }
  }

  private setupShapeInteractions(shape: Phaser.Physics.Matter.Sprite) {
    // Enable interactive mode
    shape.setInteractive();

    // Check if device supports touch
    const isTouchDevice = isMobileDevice();

    if (isTouchDevice) {
      // Mobile touch events
      shape.on('pointerdown', () => {
        this.currentlyTouched = shape;
        this.changeShapeColor(shape, true);
      });

      shape.on('pointerup', () => {
        if (this.currentlyTouched === shape) {
          this.currentlyTouched = null;
          this.changeShapeColor(shape, false);
        }
      });

      shape.on('pointerout', () => {
        if (this.currentlyTouched === shape) {
          this.currentlyTouched = null;
          this.changeShapeColor(shape, false);
        }
      });
    } else {
      // Desktop hover events
      shape.on('pointerover', () => {
        this.currentlyHovered = shape;
        this.changeShapeColor(shape, true);
      });

      shape.on('pointerout', () => {
        if (this.currentlyHovered === shape) {
          this.currentlyHovered = null;
          this.changeShapeColor(shape, false);
        }
      });

      // Focus events for keyboard navigation
      shape.on('pointerdown', () => {
        this.changeShapeColor(shape, true);
      });

      shape.on('pointerup', () => {
        // Check if still hovering to maintain hover state
        if (this.currentlyHovered !== shape) {
          this.changeShapeColor(shape, false);
        }
      });
    }
  }

  create() {
    // Set world bounds for Matter.js
    if (this.enableWorldBounds) {
      this.matter.world.setBounds(
        0,
        0,
        this.scale.width,
        this.scale.height,
        1000000,
        true,
        true,
        false,
        true
      );
    }

    // Create Matter.js mouseSpring for handling object interactions
    this.matter.add.mouseSpring({
      length: 1,
      stiffness: 0.1,
      damping: 0
    });

    // Start gradual shape creation after a small delay to ensure scene is ready
    this.time.delayedCall(50, () => {
      this.createShapesForAllLabels();
    });
  }

  update() {
    // Update text positions to follow shapes only when they've moved significantly
    this.shapeTexts.forEach((textObject, index) => {
      const shape = this.shapes[index] as Phaser.Physics.Matter.Sprite;
      if (shape && textObject) {
        // Check if shape has moved enough to warrant an update
        const lastPos = this.lastShapePositions.get(index);
        const currentPos = { x: shape.x, y: shape.y, rotation: shape.rotation };

        if (!lastPos || this.hasShapeMovedSignificantly(lastPos, currentPos)) {
          this.updateTextPosition(textObject, shape);
          this.lastShapePositions.set(index, currentPos);
        }
      }
    });
  }

  private hasShapeMovedSignificantly(
    lastPos: { x: number; y: number; rotation: number },
    currentPos: { x: number; y: number; rotation: number }
  ): boolean {
    const deltaX = Math.abs(currentPos.x - lastPos.x);
    const deltaY = Math.abs(currentPos.y - lastPos.y);
    const deltaRotation = Math.abs(currentPos.rotation - lastPos.rotation);

    return (
      deltaX > this.POSITION_THRESHOLD || deltaY > this.POSITION_THRESHOLD || deltaRotation > 0.1
    ); // ~5.7 degrees
  }

  shutdown() {
    // Clean up hover and touch states
    this.currentlyHovered = null;
    this.currentlyTouched = null;

    // Clean up gradual loading timer
    this.stopGradualLoading();

    // Clear performance tracking
    this.lastShapePositions.clear();
  }

  private stopGradualLoading(): void {
    if (this.gradualLoadingTimer) {
      this.gradualLoadingTimer.destroy();
      this.gradualLoadingTimer = null;
    }
    this.isCreatingShapes = false;
  }

  // Public method to check if shapes are still being created
  public isLoadingShapes(): boolean {
    return this.isCreatingShapes;
  }

  // Public method to get loading progress (0 to 1)
  public getLoadingProgress(): number {
    if (this.shuffledLabels.length === 0) return 1;
    return this.currentShapeIndex / this.shuffledLabels.length;
  }
}

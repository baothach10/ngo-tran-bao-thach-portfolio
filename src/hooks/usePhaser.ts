import { Game, AUTO, Scale, Scene, Types } from 'phaser';
import { useEffect, useRef, useState } from 'react';

import { IS_DEBUG } from '@/constant';
import { isMobileDevice } from '@/utils';

type TPhaserSceneConfig = {
  sceneKey: string;
  sceneClass: typeof Scene;
  gameWidth?: number;
  gameHeight?: number;
  backgroundColor?: string | number;
  physics?: {
    default: string;
    arcade?: Types.Physics.Arcade.ArcadeWorldConfig;
    matter?: Types.Physics.Matter.MatterWorldConfig;
  };
  audio?: {
    isWebAudioDisabled?: boolean;
    isAudioDisabled?: boolean;
  };
  isPixelArt?: boolean;
  hasAntialiasing?: boolean;
  isTransparent?: boolean;
  autoInit?: boolean; // New option to control auto-initialization
};

type TPhaserState = {
  game: Game;
  scene: Scene;
  isMounted: boolean;
  isGameReady: boolean;
};

export function usePhaser(config: TPhaserSceneConfig) {
  const mountRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Game | null>(null);
  const configRef = useRef<TPhaserSceneConfig>(config);
  const [state, setState] = useState<TPhaserState | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isGameReady, setIsGameReady] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Update config ref when config changes
  useEffect(() => {
    configRef.current = config;
  }, [config]);

  // Initialize Phaser game function
  const initializeGame = async (): Promise<boolean> => {
    if (!mountRef.current || isInitialized || gameRef.current) {
      return false;
    }

    const {
      sceneKey,
      sceneClass,
      gameWidth = 800,
      gameHeight = 600,
      backgroundColor = 0x2c3e50,
      physics,
      audio,
      isPixelArt = false,
      isTransparent = false
    } = configRef.current;

    const isMobile = isMobileDevice();

    try {
      const phaserConfig: Types.Core.GameConfig = {
        type: AUTO,
        width: gameWidth,
        height: gameHeight,
        parent: mountRef.current,
        backgroundColor,
        scene: sceneClass,
        physics,
        audio: {
          disableWebAudio: audio?.isWebAudioDisabled || false,
          noAudio: audio?.isAudioDisabled || false
        },
        render: {
          pixelArt: isPixelArt,
          antialias: true,
          transparent: isTransparent,
          clearBeforeRender: true,
          failIfMajorPerformanceCaveat: false,
          powerPreference: isMobile ? 'high-performance' : 'default',
          // Mobile-specific WebGL optimizations
          batchSize: isMobile ? 2000 : 4096,
          mipmapFilter: 'NEAREST'
        },
        scale: {
          mode: Scale.FIT,
          autoCenter: Scale.CENTER_BOTH,
          // Mobile-specific scale settings
          fullscreenTarget: mountRef.current
        },
        input: {
          mouse: true,
          touch: true
        },
        // Mobile performance optimizations
        disableContextMenu: true,
        banner: false,
        fps: {
          target: 60,
          deltaHistory: isMobile ? 5 : 10,
          panicMax: isMobile ? 60 : 120,
          smoothStep: isMobile ? false : true
        }
      };

      // Add debug configuration if in debug mode
      if (IS_DEBUG) {
        phaserConfig.fps = {
          target: 60,
          forceSetTimeOut: true
        };
      }

      // Create Phaser game instance
      const game = new Game(phaserConfig);
      gameRef.current = game;
      setIsInitialized(true);

      // Handle game ready event
      return new Promise<boolean>(resolve => {
        game.events.once('ready', () => {
          const scene = game.scene.getScene(sceneKey) || game.scene.scenes[0];
          if (scene) {
            // Apply mobile-specific optimizations
            if (isMobile && game.renderer) {
              // WebGL mobile optimizations
              const renderer = game.renderer as Phaser.Renderer.WebGL.WebGLRenderer;
              if (renderer.gl) {
                // Optimize WebGL context for mobile
                const gl = renderer.gl;
                // Disable depth testing if not needed for better performance
                gl.disable(gl.DEPTH_TEST);
              }
            }

            setIsGameReady(true);
            setState({
              game,
              scene,
              isMounted: true,
              isGameReady: true
            });

            // Setup wheel event for smooth scrolling
            setupWheelScrolling(game);

            resolve(true);
          } else {
            console.error('No scene found after game ready');
            resolve(false);
          }
        });

        // Handle errors
        game.events.once('error', (error: Error) => {
          console.error('Phaser game error:', error);
          resolve(false);
        });
      });
    } catch (error) {
      console.error('Failed to create Phaser game:', error);
      setIsInitialized(false);
      return false;
    }
  };

  // Setup smooth scrolling for the game canvas
  const setupWheelScrolling = (game: Game) => {
    if (!game.canvas) return;

    let scrollAccumulator = { x: 0, y: 0 };
    let isScrolling = false;

    const smoothScroll = (deltaX: number, deltaY: number) => {
      scrollAccumulator.x += deltaX * 0.3;
      scrollAccumulator.y += deltaY * 0.3;

      if (!isScrolling) {
        isScrolling = true;

        const animate = () => {
          const currentX = scrollAccumulator.x * 0.35;
          const currentY = scrollAccumulator.y * 0.35;

          if (Math.abs(currentX) > 0.1 || Math.abs(currentY) > 0.1) {
            window.scrollBy(currentX, currentY);
            scrollAccumulator.x *= 0.9;
            scrollAccumulator.y *= 0.9;
            requestAnimationFrame(animate);
          } else {
            isScrolling = false;
            scrollAccumulator = { x: 0, y: 0 };
          }
        };

        requestAnimationFrame(animate);
      }
    };

    game.canvas.addEventListener(
      'wheel',
      e => {
        e.preventDefault();
        smoothScroll(e.deltaX, e.deltaY);
      },
      { passive: false }
    );
  };

  // Destroy game function
  const destroyGame = () => {
    if (gameRef.current) {
      gameRef.current.destroy(true);
      gameRef.current = null;
      setState(null);
      setIsGameReady(false);
      setIsInitialized(false);
    }
  };

  // Auto-initialization effect (only if autoInit is true)
  useEffect(() => {
    const { autoInit: shouldAutoInit = true } = config;

    if (shouldAutoInit && mountRef.current && !isInitialized) {
      void initializeGame().catch(error => {
        console.error('Failed to auto-initialize Phaser game:', error);
      });
    }
  }, [config.autoInit, isInitialized]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      if (gameRef.current && mountRef.current) {
        const { clientWidth, clientHeight } = mountRef.current;
        gameRef.current.scale.resize(clientWidth, clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    setIsMounted(true);

    return () => {
      window.removeEventListener('resize', handleResize);
      setIsMounted(false);
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      destroyGame();
    };
  }, []);

  // Helper functions for game control
  const pauseGame = () => {
    if (state?.game && config.sceneKey) {
      state.game.scene.pause(config.sceneKey);
    }
  };

  const resumeGame = () => {
    if (state?.game && config.sceneKey) {
      state.game.scene.resume(config.sceneKey);
    }
  };

  const restartScene = () => {
    if (state?.scene) {
      state.scene.scene.restart();
    }
  };

  const switchScene = (newSceneKey: string, data?: object) => {
    if (state?.scene) {
      state.scene.scene.start(newSceneKey, data);
    }
  };

  const addScene = (sceneKey: string, sceneClass: typeof Scene, shouldAutoStart = false) => {
    if (state?.game) {
      state.game.scene.add(sceneKey, sceneClass, shouldAutoStart);
    }
  };

  const removeScene = (sceneKey: string) => {
    if (state?.game) {
      state.game.scene.remove(sceneKey);
    }
  };

  // Get current scene
  const getCurrentScene = () => {
    return state?.scene;
  };

  // Get game instance
  const getGame = () => {
    return state?.game;
  };

  return {
    mountRef,
    game: state?.game,
    scene: state?.scene,
    isMounted,
    isGameReady,
    isInitialized,
    // Initialization functions
    initializeGame,
    destroyGame,
    // Control functions
    pauseGame,
    resumeGame,
    restartScene,
    switchScene,
    addScene,
    removeScene,
    getCurrentScene,
    getGame
  };
}

export default usePhaser;

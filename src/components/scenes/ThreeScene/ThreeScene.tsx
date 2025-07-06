import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimationAction, LoopOnce, Raycaster, Vector2, Vector3 } from "three";

import { useAssets } from "@/context/AssetLoaderContext";
import { useThree } from "@/hooks/useThree";
import { getTopPosition, playAnimationLoop, playAnimationOnce } from "@/utils";

import './ThreeScene.css';

const ThreeScene = () => {
    const {
        mountRef,
        webglScene,
        camera,
        orbitControls,
        enableModelLookAtMouse,
        disableModelLookAtMouse,
        ambientLight,
        webglRenderer,
        isMounted,
    } = useThree({ hasOrbitControls: true });
    const location = useLocation();

    const { models, isLoaded, animationActions, textures } = useAssets()
    const currentAnimationActionsRef = useRef<AnimationAction | undefined>(undefined);
    const currentRandomAnimationIsRunningRef = useRef<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [allowInteraction, setAllowInteraction] = useState<boolean>(false);

    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        if (
            !webglScene ||
            !camera ||
            !webglRenderer ||
            !isLoaded ||
            !models['manInVest'] ||
            !animationActions['manInVest-Idle']
        )
            return;

        if (ambientLight) {
            ambientLight.intensity = 1.5;
        }

        camera.position.set(0, 0, 6)

        models['manInVest'].scene.position.set(-0.75, 0, 4);
        models['manInVest'].scene.lookAt(camera.getWorldPosition(new Vector3()));

        if (models['room']) {
            models['room'].scene.position.set(0, 1.45, -4);
            models['room'].scene.rotation.y = - Math.PI / 2;
            webglScene.add(models['room'].scene);
        }

        const topPosition = getTopPosition(models['manInVest'].scene);

        if (orbitControls) {
            // Allow 15 degree vertical look up and 10 down
            orbitControls.minPolarAngle = Math.PI / 2 - (15 * Math.PI / 180); // 85 deg
            orbitControls.maxPolarAngle = Math.PI / 2 + (-10 * Math.PI / 180); // 75 deg

            // Allow 10 degree horizontal look (left/right)
            orbitControls.minAzimuthAngle = -10 * Math.PI / 180; // -10 deg
            orbitControls.maxAzimuthAngle = 10 * Math.PI / 180;  // 10 deg

            // Disable zooming
            orbitControls.enableZoom = false;
        }

        if (textures['roomHDRI']) {
            webglScene.background = textures['roomHDRI'];
            webglScene.environment = textures['roomHDRI'];
        }
        camera.position.set(0, 1.5, 6.5);
        camera.lookAt(topPosition.clone());

        webglScene.add(models['manInVest'].scene)

        timelineRef.current = gsap.timeline();

        playInitialAnimation(animationActions);
        return () => {
            currentAnimationActionsRef.current = undefined;
            currentRandomAnimationIsRunningRef.current = false;
            // Stop and pause all currently running animations
            Object.values(animationActions).forEach((action) => {
                if (action) {
                    action.fadeOut(0.2);
                    action.stop();
                    action.enabled = false;
                    action.paused = true;
                    action.time = 0;
                }
            });

            // Clear all gsap timeline actions
            if (timelineRef.current) {
                timelineRef.current.clear();
                timelineRef.current.kill();
                timelineRef.current = null;
            }
            // Remove any running gsap animations in the home page scene
            gsap.globalTimeline.getChildren().forEach((anim) => {
                if (anim.vars?.id === 'scene-home-page-animation') {
                    anim.kill();
                }
            });
        };
    }, [isMounted, isLoaded, location.pathname]);

    useEffect(() => {
        if (!camera ||
            !webglRenderer ||
            !allowInteraction) return;

        // Setup raycaster for mouse interactions
        const raycaster = new Raycaster();
        const mouse = new Vector2();

        const handleClick = (event: MouseEvent) => {
            // Convert mouse to NDC
            const rect = webglRenderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);

            const intersects = raycaster.intersectObject(models['manInVest']!.scene, true); // true for recursive search in groups

            if (intersects.length > 0) {
                playRandomAnimation(animationActions);
            }
        }

        webglRenderer?.domElement.addEventListener("click", handleClick);
        return () => {
            webglRenderer?.domElement.removeEventListener("click", handleClick);
        };

    }, [allowInteraction]);

    function playRandomAnimation(animationActions: { [key: string]: AnimationAction }) {
        const animations = Object.values(animationActions);
        if (animations.length === 0 || currentRandomAnimationIsRunningRef.current) return;
        currentRandomAnimationIsRunningRef.current = true;

        // Stop any currently playing animation
        if (currentAnimationActionsRef.current) {
            currentAnimationActionsRef.current.fadeOut(1);
            currentAnimationActionsRef.current.stop();
            currentAnimationActionsRef.current.enabled = false;
            currentAnimationActionsRef.current.paused = true;
            currentAnimationActionsRef.current.time = 0;
        }
        // Randomly select an animation
        // Filter out the idle animation
        const nonIdleAnimations = animations.filter(
            (anim) =>
                anim !== animationActions['manInVest-Idle'] &&
                anim !== animationActions['manInVest-Sad-Idle']
        );
        if (nonIdleAnimations.length === 0) return;

        let randomIndex = Math.floor(Math.random() * nonIdleAnimations.length);
        // Ensure the new animation is different from the current one
        while (nonIdleAnimations[randomIndex] === currentAnimationActionsRef.current && nonIdleAnimations.length > 1) {
            randomIndex = Math.floor(Math.random() * nonIdleAnimations.length);
        }

        const randomAnimation = nonIdleAnimations[randomIndex];
        if (!randomAnimation) return;

        // Reset and play the selected animation
        randomAnimation.reset();
        // randomAnimation.setLoop(LoopOnce, 1);
        randomAnimation.clampWhenFinished = true;
        randomAnimation.enabled = true;
        randomAnimation.fadeIn(1);

        gsap.to({}, {
            duration: randomAnimation.getClip().duration,
            id: 'scene-home-page-animation',
            onStart: () => {
                // Play the animation once
                playAnimationOnce(randomAnimation, 0.2);
                disableModelLookAtMouse();
            },
            onComplete: () => {
                currentAnimationActionsRef.current = randomAnimation;
                playIdleAnimation(animationActions);
                currentRandomAnimationIsRunningRef.current = false;
            }
        });
    }

    function playIdleAnimation(animationActions: { [key: string]: AnimationAction }) {
        const idle = animationActions['manInVest-Idle'];
        if (!idle) return;
        enableModelLookAtMouse(models['manInVest']!.scene.getObjectByName('mixamorigHead')!);
        // Stop any currently playing animation
        if (currentAnimationActionsRef.current) {
            currentAnimationActionsRef.current.fadeOut(1);
            currentAnimationActionsRef.current.stop();
            currentAnimationActionsRef.current.enabled = false;
            currentAnimationActionsRef.current.paused = true;
            currentAnimationActionsRef.current.time = 0;
        }
        gsap.to({}, {
            duration: idle.getClip().duration,
            id: 'scene-home-page-animation',
            onStart: () => {
                idle.reset();
                idle.enabled = true;
                idle.fadeIn(1);
                playAnimationLoop(idle, 0.2);
                currentAnimationActionsRef.current = idle;
            }
        });
    }

    function playSpecificAnimation(animationActions: { [key: string]: AnimationAction }, animationName: string) {
        const specificAnim = animationActions[animationName];
        if (!specificAnim) return;
        // Stop any currently playing animation
        if (currentAnimationActionsRef.current) {
            currentAnimationActionsRef.current.fadeOut(1);
            currentAnimationActionsRef.current.stop();
            currentAnimationActionsRef.current.enabled = false;
            currentAnimationActionsRef.current.paused = true;
            currentAnimationActionsRef.current.time = 0;
        }
        // Reset and play the bow animation
        specificAnim.reset();
        specificAnim.setLoop(LoopOnce, 1);
        specificAnim.clampWhenFinished = true;
        specificAnim.enabled = true;
        specificAnim.fadeIn(1);
        gsap.to({}, {
            duration: specificAnim.getClip().duration,
            id: 'scene-home-page-animation',
            onStart: () => {
                // Play the animation once
                disableModelLookAtMouse();
                playAnimationOnce(specificAnim, 0.2);
            },
            onComplete: () => {
                // setCurrentAnimationAction(bow);
                currentAnimationActionsRef.current = specificAnim;
                enableModelLookAtMouse(models['manInVest']!.scene.getObjectByName('mixamorigHead')!);
            }
        });
    }

    function playInitialAnimation(animationActions: { [key: string]: AnimationAction }) {
        if (!timelineRef.current) return;
        const waving = animationActions['manInVest-Waving'];
        const idle = animationActions['manInVest-Idle'];

        if (!waving || !idle) return;

        // Stop any currently playing animation
        if (currentAnimationActionsRef.current) {
            currentAnimationActionsRef.current.fadeOut(1);
            currentAnimationActionsRef.current.stop();
            currentAnimationActionsRef.current.enabled = false;
            currentAnimationActionsRef.current.paused = true;
            currentAnimationActionsRef.current.time = 0;
        }

        // Play waving animation once using gsap timeline, then play idle in loop
        waving.reset();
        // waving.setLoop(LoopOnce, 1);
        waving.clampWhenFinished = true;
        waving.enabled = true;
        timelineRef.current.to({}, {
            duration: waving.getClip().duration,
            onStart: () => {
                waving.fadeIn(1);
                playAnimationOnce(waving, 0.2);
            },

            onComplete: () => {
                waving.fadeOut(1);
                waving.stop();
                waving.enabled = false;
                waving.paused = true;
                waving.time = 0;
                enableModelLookAtMouse(models['manInVest']!.scene.getObjectByName('mixamorigHead')!)
                setAllowInteraction(true);
            }
        });
        timelineRef.current.to({}, {
            duration: idle.getClip().duration,
            onStart: () => {
                idle.reset();
                idle.enabled = true;
                idle.fadeIn(1);
                playAnimationLoop(idle, 0.2);
                currentAnimationActionsRef.current = idle;
            }
        });
    }


    return (
        <div className="three-scene-container">
            <div
                ref={mountRef}
            >
            </div>
        </div>
    );
};

export default ThreeScene;

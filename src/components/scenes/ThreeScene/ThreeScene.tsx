import gsap from "gsap";
import React, { useEffect } from "react";
import { AnimationAction, LoopOnce } from "three";

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
        ambientLight,
        webglRenderer,
        isMounted
    } = useThree({ hasOrbitControls: true });

    const { models, isLoaded, animationActions, textures } = useAssets()
    const [currentAnimationActionsRef, setCurrentAnimationActionsRef] = React.useState<AnimationAction | undefined>(undefined);

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

        models['manInVest'].scene.position.set(-0.5, 0, 2.5);

        if (models['room']) {
            models['room'].scene.position.set(-0.5, 1.45, -4);
            models['room'].scene.rotation.y = - Math.PI / 2;
            webglScene.add(models['room'].scene);
        }

        const topPosition = getTopPosition(models['manInVest'].scene);

        if (orbitControls) {
            // Allow 15 degree vertical look up and 10 down
            orbitControls.minPolarAngle = Math.PI / 2 - (15 * Math.PI / 180); // 85 deg
            orbitControls.maxPolarAngle = Math.PI / 2 + (-10 * Math.PI / 180); // 75 deg

            // Allow 30 degree horizontal look (left/right)
            orbitControls.minAzimuthAngle = -10 * Math.PI / 180; // -30 deg
            orbitControls.maxAzimuthAngle = 10 * Math.PI / 180;  // 30 deg

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

        playAnimation(animationActions);

    }, [isMounted, isLoaded]);

    useEffect(() => {
        if (!isLoaded || !currentAnimationActionsRef) return;


        playRandomAnimation(animationActions);

    }, [currentAnimationActionsRef]);

    function playRandomAnimation(animationActions: { [key: string]: AnimationAction }) {
        const animations = Object.values(animationActions);
        if (animations.length === 0) return;


        // Stop any currently playing animation
        if (currentAnimationActionsRef) {
            currentAnimationActionsRef.fadeOut(1);
            currentAnimationActionsRef.stop();
            currentAnimationActionsRef.enabled = false;
            currentAnimationActionsRef.paused = true;
            currentAnimationActionsRef.time = 0;
        }

        // Randomly select an animation
        let randomIndex = Math.floor(Math.random() * animations.length);
        // Ensure the new animation is different from the current one
        while (animations[randomIndex] === currentAnimationActionsRef) {
            randomIndex = Math.floor(Math.random() * animations.length);
        }

        const randomAnimation = animations[randomIndex]
        if (!randomAnimation) return;

        // Reset and play the selected animation
        randomAnimation.reset();
        // randomAnimation.setLoop(LoopOnce, 1);
        randomAnimation.clampWhenFinished = true;
        randomAnimation.enabled = true;
        randomAnimation.fadeIn(1);

        gsap.to({}, {
            duration: randomAnimation.getClip().duration,
            onStart: () => {
                // Play the animation once
                playAnimationOnce(randomAnimation, 0.2);
            },
            onComplete: () => {
                setCurrentAnimationActionsRef(randomAnimation);
                // enableModelLookAtMouse(models['manInVest']!.scene.getObjectByName('mixamorigHead')!);
            }
        });


        // Disable look at mouse while playing animation
        // disableModelLookAtMouse();
    }

    function playAnimation(animationActions: { [key: string]: AnimationAction }) {
        const timeline = gsap.timeline();
        const waving = animationActions['manInVest-Waving'];
        const idle = animationActions['manInVest-Idle'];
        const bow = animationActions['manInVest-Bow'];
        const sadIdle = animationActions['manInVest-Sad-Idle'];
        const salute = animationActions['manInVest-Salute'];

        if (!waving || !idle || !bow || !sadIdle || !salute) return;

        // Play waving animation once using gsap timeline, then play idle in loop
        waving.reset();
        waving.setLoop(LoopOnce, 1);
        waving.clampWhenFinished = true;
        waving.enabled = true;
        timeline.to({}, {
            duration: waving.getClip().duration,
            onStart: () => {
                waving.fadeIn(1);
                playAnimationOnce(waving, 0.2);
            },

            onComplete: () => {
                waving.fadeOut(1);
                enableModelLookAtMouse(models['manInVest']!.scene.getObjectByName('mixamorigHead')!)
            }
        });
        timeline.to({}, {
            duration: idle.getClip().duration,
            onStart: () => {
                idle.reset();
                idle.enabled = true;
                idle.fadeIn(1);
                playAnimationLoop(idle, 0.2);
            },
            onComplete: () => {
                setCurrentAnimationActionsRef(idle);
            }
        });
    }


    return (
        <div className="three-scene-container">
            <div
                ref={mountRef}
            >
                {/* 3D scene will be rendered here */}
            </div>
        </div>
    );
};

export default ThreeScene;

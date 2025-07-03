import React, { useEffect } from "react";

import { useAssets } from "@/context/AssetLoaderContext";
import { useThree } from "@/hooks/useThree";
import { getTopPosition, playAnimationOnce } from "@/utils";
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
    } = useThree({ hasOrbitControls: true});

    const { models, isLoaded, animationActions, textures } = useAssets()

    useEffect(() => {
        if (
            !webglScene ||
            !camera ||
            !webglRenderer ||
            !isLoaded ||
            !models['manInVest'] ||
            !animationActions['manInVest-Waving']
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

        enableModelLookAtMouse(models['manInVest'].scene.getObjectByName('mixamorigHead')!);

        if (orbitControls) {
            // Allow 15 degree vertical look up and 10 down
            orbitControls.minPolarAngle = Math.PI / 2 - (15 * Math.PI / 180); // 85 deg
            orbitControls.maxPolarAngle = Math.PI / 2 + (-10 * Math.PI / 180); // 75 deg

            // Allow 30 degree horizontal look (left/right)
            orbitControls.minAzimuthAngle = -20 * Math.PI / 180; // -30 deg
            orbitControls.maxAzimuthAngle = 20 * Math.PI / 180;  // 30 deg

            // Disable zooming
            orbitControls.enableZoom = false;
        }

        if (textures['roomHDRI']) {
            webglScene.background = textures['roomHDRI'];
            webglScene.environment = textures['roomHDRI'];
            // textures['roomHDRI'].mapping = EquirectangularReflectionMapping;
        }
        camera.position.set(0, 1.5, 6.5);
        camera.lookAt(topPosition.clone());

        webglScene.add(models['manInVest'].scene)

        playAnimationOnce(animationActions['manInVest-Waving'], 0.2);

    }, [isMounted, isLoaded]);


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

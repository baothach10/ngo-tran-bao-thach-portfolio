import React, { useEffect } from "react";
import { BoxGeometry, MeshStandardMaterial, Mesh, DirectionalLightHelper } from "three";

import { useAssets } from "@/context/AssetLoaderContext";
import { useThree } from "@/hooks/useThree";
import { getModelCenter, getTopPosition, playAnimationOnce } from "@/utils";

const ThreeScene = () => {
    const {
        mountRef,
        webglScene,
        camera,
        directionalLight,
        ambientLight,
        webglRenderer,
        isMounted
    } = useThree({ hasOrbitControls: true, hasAmbientLight: true, hasDirectionalLight: true });

    const { models, isLoaded, animationActions } = useAssets()

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
            ambientLight.intensity = 2.5;
        }

        const modelCenter = getModelCenter(models['manInVest'].scene);

        const topPosition = getTopPosition(models['manInVest'].scene);

        // Create a cube at the top position of the model
        const cubeGeometry = new BoxGeometry(0.2, 0.2, 0.2);
        const cubeMaterial = new MeshStandardMaterial({ color: 0xff0000 });
        const cube = new Mesh(cubeGeometry, cubeMaterial);
        cube.position.copy(topPosition);

        webglScene.add(cube);

        if (directionalLight) {
            directionalLight.intensity = 1.5;
            directionalLight.position.set(0, 2, 3);
            directionalLight.target.position.copy(cube.position);
            webglScene.add(directionalLight.target);

            const lightHelper = new DirectionalLightHelper(directionalLight, 1, 0x00ff00);
            webglScene.add(lightHelper);
        }
        camera.position.set(0, 1, 5);
        camera.lookAt(modelCenter.clone());

        webglScene.add(models['manInVest'].scene)

        playAnimationOnce(animationActions['manInVest-Waving'], 0.2);

    }, [isMounted, isLoaded]);


    return (
        <div
            ref={mountRef}
        >
            {/* 3D scene will be rendered here */}
        </div>
    );
};

export default ThreeScene;

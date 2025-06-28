import React, { useEffect } from "react";
import { Color, BoxGeometry, MeshStandardMaterial, Mesh } from "three";

import { useThree } from "@/hooks/useThree";

const ThreeScene: React.FC = () => {
    const {
        mountRef,
        webglScene,
        camera,
        directionalLight,
        webglRenderer,
        isMounted
    } = useThree({ hasOrbitControls: true, hasDirectionalLight: true });

    useEffect(() => {
        if (
            !webglScene ||
            !camera ||
            !webglRenderer
        )
            return;

        // Set up the scene, camera, and renderer
        webglScene.background = new Color(0x000000);

        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshStandardMaterial({ color: 'green' });
        const cube = new Mesh(geometry, material);

        if (directionalLight) {
            directionalLight.intensity = 10;
        }

        webglScene.add(cube);
        camera.position.set(0, 0, 20);

        // camera.lookAt(cube.position);

    }, [isMounted]);


    return (
        <div
            ref={mountRef}
        >
            {/* 3D scene will be rendered here */}
        </div>
    );
};

export default ThreeScene;

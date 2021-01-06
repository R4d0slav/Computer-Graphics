const vec3 = glMatrix.vec3;

export default class Trees {
     constructor() {   
        this.trees = [];
    }

    async build(loader, scene) {
        await loader.load('./blender/tree.gltf');
        let tree = await loader.loadNode(loader.defaultScene);
        tree.translation = vec3.set(vec3.create(), 100, -4, 0);
        tree.scale = vec3.set(vec3.create(), 3, 3, 3);
        this.trees.push(tree);

        await loader.load('./blender/tree.gltf');
        tree = await loader.loadNode(loader.defaultScene);
        tree.translation = vec3.set(vec3.create(), 0, -4, 0);
        tree.scale = vec3.set(vec3.create(), 2, 2, 2);
        this.trees.push(tree);

        await loader.load('./blender/tree.gltf');
        tree = await loader.loadNode(loader.defaultScene);
        tree.translation = vec3.set(vec3.create(), 0, -4, 105);
        tree.scale = vec3.set(vec3.create(), 4, 4, 4);
        this.trees.push(tree);

        await loader.load('./blender/tree.gltf');
        tree = await loader.loadNode(loader.defaultScene);
        tree.translation = vec3.set(vec3.create(), -140, -4, 55);
        tree.scale = vec3.set(vec3.create(), 5, 5, 5);
        this.trees.push(tree);

        await loader.load('./blender/tree.gltf');
        tree = await loader.loadNode(loader.defaultScene);
        tree.translation = vec3.set(vec3.create(), -255, -4, 95);
        tree.scale = vec3.set(vec3.create(), 3, 3, 3);
        this.trees.push(tree);
       
        await loader.load('./blender/tree.gltf');
        tree = await loader.loadNode(loader.defaultScene);
        tree.translation = vec3.set(vec3.create(), -70, -4, -105);
        tree.scale = vec3.set(vec3.create(), 5, 5, 5);
        this.trees.push(tree);

        await loader.load('./blender/tree.gltf');
        tree = await loader.loadNode(loader.defaultScene);
        tree.translation = vec3.set(vec3.create(), -40, -4, -245);
        tree.scale = vec3.set(vec3.create(), 5, 5, 5);
        this.trees.push(tree);

        await loader.load('./blender/tree.gltf');
        tree = await loader.loadNode(loader.defaultScene);
        tree.translation = vec3.set(vec3.create(), -230, -4, -200);
        tree.scale = vec3.set(vec3.create(), 5, 5, 5);
        this.trees.push(tree);
        
        await loader.load('./blender/tree.gltf');
        tree = await loader.loadNode(loader.defaultScene);
        tree.translation = vec3.set(vec3.create(), -200, -4, -75);
        tree.scale = vec3.set(vec3.create(), 2, 2, 2);
        this.trees.push(tree);

        await loader.load('./blender/tree.gltf');
        tree = await loader.loadNode(loader.defaultScene);
        tree.translation = vec3.set(vec3.create(), 250, -4, 70);
        tree.scale = vec3.set(vec3.create(), 5, 5, 5);
        this.trees.push(tree);

        await loader.load('./blender/tree.gltf');
        tree = await loader.loadNode(loader.defaultScene);
        tree.translation = vec3.set(vec3.create(), -200, -4, 105);
        tree.scale = vec3.set(vec3.create(), 4, 4, 4);
        this.trees.push(tree);

        await loader.load('./blender/tree.gltf');
        tree = await loader.loadNode(loader.defaultScene);
        tree.translation = vec3.set(vec3.create(), 240, -4, -225);
        tree.scale = vec3.set(vec3.create(), 5, 5, 5);
        this.trees.push(tree);

        await loader.load('./blender/tree.gltf');
        tree = await loader.loadNode(loader.defaultScene);
        tree.translation = vec3.set(vec3.create(), 120, -4, -150);
        tree.scale = vec3.set(vec3.create(), 5, 5, 5);
        this.trees.push(tree);

        await loader.load('./blender/tree.gltf');
        tree = await loader.loadNode(loader.defaultScene);
        tree.translation = vec3.set(vec3.create(), 70, -5, -65);
        tree.scale = vec3.set(vec3.create(), 6, 6, 6);
        this.trees.push(tree);

        await loader.load('./blender/tree.gltf');
        tree = await loader.loadNode(loader.defaultScene);
        tree.translation = vec3.set(vec3.create(), 150, -4, 245);
        tree.scale = vec3.set(vec3.create(), 4, 5, 4);
        this.trees.push(tree);

        await loader.load('./blender/tree.gltf');
        tree = await loader.loadNode(loader.defaultScene);
        tree.translation = vec3.set(vec3.create(), 60, -4, 215);
        tree.scale = vec3.set(vec3.create(), 7, 5, 7);
        this.trees.push(tree);

        await loader.load('./blender/tree.gltf');
        tree = await loader.loadNode(loader.defaultScene);
        tree.translation = vec3.set(vec3.create(), -40, -4, 255);
        tree.scale = vec3.set(vec3.create(), 4, 5, 4);
        this.trees.push(tree);

        await loader.load('./blender/tree.gltf');
        tree = await loader.loadNode(loader.defaultScene);
        tree.translation = vec3.set(vec3.create(), -140, -4, 165);
        tree.scale = vec3.set(vec3.create(), 5, 5, 5);
        this.trees.push(tree);

        await loader.load('./blender/tree.gltf');
        tree = await loader.loadNode(loader.defaultScene);
        tree.translation = vec3.set(vec3.create(), 300, -4, 400);
        tree.scale = vec3.set(vec3.create(), 6, 5, 6);
        this.trees.push(tree);

        await loader.load('./blender/tree.gltf');
        tree = await loader.loadNode(loader.defaultScene);
        tree.translation = vec3.set(vec3.create(), 280, -4, 250);
        tree.scale = vec3.set(vec3.create(), 5, 5, 5);
        this.trees.push(tree);

        await loader.load('./blender/tree.gltf');
        tree = await loader.loadNode(loader.defaultScene);
        tree.translation = vec3.set(vec3.create(), 380, -4, -100);
        tree.scale = vec3.set(vec3.create(), 5, 5, 5);
        this.trees.push(tree);

        await loader.load('./blender/tree.gltf');
        tree = await loader.loadNode(loader.defaultScene);
        tree.translation = vec3.set(vec3.create(), 350, -4, -340);
        tree.scale = vec3.set(vec3.create(), 4, 2, 4);
        this.trees.push(tree);

        await loader.load('./blender/tree.gltf');
        tree = await loader.loadNode(loader.defaultScene);
        tree.translation = vec3.set(vec3.create(), 70, -4, -350);
        tree.scale = vec3.set(vec3.create(), 5, 5, 5);
        this.trees.push(tree);

        await loader.load('./blender/tree.gltf');
        tree = await loader.loadNode(loader.defaultScene);
        tree.translation = vec3.set(vec3.create(), -380, -4, -330);
        tree.scale = vec3.set(vec3.create(), 4, 5, 4);
        this.trees.push(tree);

        await loader.load('./blender/tree.gltf');
        tree = await loader.loadNode(loader.defaultScene);
        tree.translation = vec3.set(vec3.create(), -400, -4, -40);
        tree.scale = vec3.set(vec3.create(), 5, 7, 5);
        this.trees.push(tree);

        await loader.load('./blender/tree.gltf');
        tree = await loader.loadNode(loader.defaultScene);
        tree.translation = vec3.set(vec3.create(), -380, -4, 330);
        tree.scale = vec3.set(vec3.create(), 7, 7, 7);
        this.trees.push(tree);

        await loader.load('./blender/tree.gltf');
        tree = await loader.loadNode(loader.defaultScene);
        tree.translation = vec3.set(vec3.create(), -210, -4, 340);
        tree.scale = vec3.set(vec3.create(), 7, 5, 7);
        this.trees.push(tree);

        await loader.load('./blender/tree.gltf');
        tree = await loader.loadNode(loader.defaultScene);
        tree.translation = vec3.set(vec3.create(), 0, -4, 370);
        tree.scale = vec3.set(vec3.create(), 5, 5, 5);
        this.trees.push(tree);


        this.add(scene);
    }

    add(scene) {
        for (let i=0;i<this.trees.length;i++) {
            scene.addNode(this.trees[i]);
            this.trees[i].updateMatrix();
        
        }
    }
     

    collision(object, dt, angles, key) {
        let collided = false;
        for (let i=0; i<this.trees.length; i++) {
            if ((object.translation[0] < this.trees[i].translation[0]+10 && 
                object.translation[0] > this.trees[i].translation[0]-10 && 
                object.translation[2] < this.trees[i].translation[2]+10 && 
                object.translation[2] > this.trees[i].translation[2]-10)) {
               collided = true; 
            }

            if (collided) {    
                vec3.sub(object.translation, object.translation, vec3.set(vec3.create(), Math.sin(angles[1])*0.0005, 0, -Math.cos(angles[1])*0.0005));
                object.collided=true;               
                }
            
        }
        // Wall collision check
        if (!collided &&
            (object.translation[2] < -390 ||
            object.translation[2] >  458 ||
            object.translation[0] <  -427 ||
            object.translation[0] >  405)) {

                if (object.translation[2] < -390) {
                    vec3.add(object.translation, object.translation, vec3.set(vec3.create(), 0, 0, 0.02));
                    object.collided = true;
                }
                else if (object.translation[2] > 458) {
                    vec3.add(object.translation, object.translation, vec3.set(vec3.create(), 0, 0, -0.02));
                    object.collided = true;
                }
                else if (object.translation[0] < -427) {
                    vec3.add(object.translation, object.translation, vec3.set(vec3.create(), 0.02, 0, 0));
                    object.collided = true;
                }
                else if (object.translation[0] > 405) {
                    vec3.add(object.translation, object.translation, vec3.set(vec3.create(), -0.02, 0, 0));
                    object.collided = true;  
                }
                else {
                    vec3.scaleAndAdd(object.translation, object.translation, object.velocity, dt);
                    object.collided = false;
                }
            object.collided = true;
        }
       
        else if(!collided) {
            vec3.scaleAndAdd(object.translation, object.translation, object.velocity, dt);
            object.collided = false;
        }
    }


}
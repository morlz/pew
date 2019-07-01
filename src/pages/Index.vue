<template>
	<div class="Scene">
		<div
			@click="addOctahedron"
			class="Scene__view"
			ref="scene"
		></div>
		<div class="Scene__controls"></div>
	</div>
</template>


<script>
import '~/controls/OrbitControls'

console.log(THREE)

const TEXTURE_NAME = 'statics/GRAFON/dirt.png'

import { Octahedron } from '@/lib'

console.log(Octahedron.geometry)

export default {
	name: 'PageIndex',
	data () {
		return {
			scene: null,
			camera: null,
			controls: null,
			renderer: null,
			loader: null,
			lights: {},
			items: []
		}
	},
	methods: {
		addOctahedron () {
			const material = new THREE.MeshStandardMaterial({
				color: 0xeeeeee,
				side: THREE.DoubleSide
			})

			const mesh = new THREE.Mesh(Octahedron.geometry, material)

			this.scene.add(mesh)
			this.items.push(mesh)
			//mesh.position.x = this.items.length * 2

			scene.add(new THREE.FaceNormalsHelper(mesh, 2, 0x00ff00, 1))
			//scene.add(new THREE.VertexNormalsHelper(mesh, 2, 0xff0000, 1))

			return mesh
		}
	},
	mounted () {
		const scene = new THREE.Scene()
		global.scene = scene
		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
		const controls = new THREE.OrbitControls(camera)
		const renderer = new THREE.WebGLRenderer()
		const loader = new THREE.TextureLoader()
		const loadTexture = name =>
			new Promise((resolve, reject) => loader.load(name, resolve, reject))

		renderer.setSize(window.innerWidth, window.innerHeight)

		this.scene = scene
		this.camera = camera
		this.controls = controls
		this.renderer = renderer
		this.loader = loader


		const light1 = new THREE.PointLight(0x00ff00, 1, 50)
		light1.position.set(-2, -2, 2)
		scene.add(light1)

		const light2 = new THREE.PointLight(0xff0000, 1, 50)
		light2.position.set(2, 2, 2)
		scene.add(light2)

		const light3 = new THREE.PointLight(0x0000ff, 1, 50)
		light3.position.set(-2, 2, -2)
		scene.add(light3)

		const light4 = new THREE.PointLight(0x666666, 1, 50)
		light4.position.set(2, -2, -2)
		scene.add(light4)

		this.linghts = {
			light1,
			light2,
			light3,
			light4,
		}

		camera.position.z = 2

		this.$refs.scene.appendChild(renderer.domElement)

		void function animate () {
			requestAnimationFrame(animate)

			controls.update()
			renderer.render(scene, camera)
		}()

		this.addOctahedron()

		return

			; (async () => {
				const texture = await loadTexture(TEXTURE_NAME)
				//const d = 0.1
				//texture.repeat.set(d, d)

				const material = new THREE.MeshStandardMaterial({
					//const material = new THREE.MeshBasicMaterial({
					//map: texture,
					color: 0xeeeeee,
					side: THREE.DoubleSide
				})

				const cube = new THREE.Mesh(Octahedron.geometry, material)

				scene.add(cube)

				//scene.add(new THREE.FaceNormalsHelper(cube, 2, 0x00ff00, 1))
				//scene.add(new THREE.VertexNormalsHelper(cube, 2, 0xff0000, 1))
			})()






		return
			; (async () => {
				const texture = await loadTexture(TEXTURE_NAME)
				const material = new THREE.MeshBasicMaterial({
					map: texture
				})

				const createChunk = (x, z, chunkSize = 16) =>
					new Promise(resolve => {
						setTimeout(() => {
							const chunk = Array(chunkSize)
								.fill(0)
								.map((el, xi) => {
									return Array(chunkSize)
										.fill(0)
										.map((el, zi) => {
											const geometry = new THREE.BoxGeometry(1, 1, 1)
											//const geometry = Octahedron.geometry

											geometry.translate(
												x * chunkSize + xi - chunkSize / 2,
												0,
												z * chunkSize + zi - chunkSize / 2
											)

											const cube = new THREE.Mesh(geometry, material)
											scene.add(cube)

											cube.rotation.x = 0.5
											cube.rotation.y = 0.5
											return cube
										})
								})

							resolve(chunk)
						}, 1)
					})

				console.log(texture, material)



				const size = 1

				const x = await Promise.all(
					Array(size)
						.fill(0)
						.map((el, xi) => {
							return Promise.all(
								Array(size)
									.fill(0)
									.map((el, zi) => createChunk(xi - size / 2, zi - size / 2))
							)
						})
				)
			})()


	}
}
</script>


<style>
body {
	margin: 0;
}
canvas {
	width: 100%;
	height: 100%;
}
</style>

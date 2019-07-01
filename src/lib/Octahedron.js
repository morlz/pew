



export class Octahedron {
	static get geometry () {
		const geometry = new THREE.Geometry()

		const verticles = []

		const vertices = [
			//left
			[-1, -0.5, 0],
			[-1, 0, 0.5],
			[-1, 0, -0.5],
			[-1, 0.5, 0],

			//back
			[-0.5, 0, -1],
			[0, 0.5, -1],
			[0, -0.5, -1],
			[0.5, 0, -1],

			//right
			[1, 0, -0.5],
			[1, 0.5, 0],
			[1, -0.5, 0],
			[1, 0, 0.5],

			//front
			[-0.5, 0, 1],
			[0, 0.5, 1],
			[0, -0.5, 1],
			[0.5, 0, 1],

			//top
			[-0.5, 1, 0],
			[0, 1, 0.5],
			[0, 1, -0.5],
			[0.5, 1, 0],

			//bottom
			[-0.5, -1, 0],
			[0, -1, 0.5],
			[0, -1, -0.5],
			[0.5, -1, 0],
		]

		const faces = [
			
			//left
			[0, 1, 2],
			[3, 1, 2],

			//back
			[4, 5, 6],
			[7, 5, 6],

			//right
			[8, 9, 10],
			[11, 9, 10],

			//front
			[12, 13, 14],
			[15, 13, 14],

			//top
			[16, 17, 18],
			[19, 17, 18],

			//bottom
			[20, 21, 22],
			[23, 21, 22],


			/**
			 * Top section
			 */


			//left back
			[2, 3, 16],
			[16, 2, 4],
			[18, 16, 4],
			[5, 4, 18],


			//right back
			[8, 9, 19],
			[7, 8, 19],
			[18, 7, 19],
			[18, 7, 5],


			//left front
			[1, 17, 16, 1],
			[1, 16, 3, 1],
			[17, 12, 1, 1],
			[13, 17, 12, 1],

			//right front
			[9, 19, 11],
			[19, 17, 11],
			[11, 17, 15],
			[15, 17, 13],

			/**
			 * Botom section
			 */


			//left back
			[2, 0, 20],
			[4, 2, 20],
			[4, 22, 20],
			[4, 22, 6],

			//left front
			[0, 1, 20],
			[12, 1, 20],
			[12, 20, 21],
			[21, 12, 14],


			//right back
			[7, 6, 22],
			[7, 8, 22],
			[23, 8, 22],
			[23, 8, 10],

			//right front
			[21, 14, 15],
			[23, 21, 15],
			[23, 15, 11],
			[23, 10, 11],
		]

		console.log({
			vertices,
			faces
		})

		geometry.vertices.push(
			...vertices.map(vec3 => new THREE.Vector3(...vec3))
		)

		geometry.faces.push(
			...faces.map(([x, y, z, d]) => {
				const vec3 = [x, y, z]
				const normal = new THREE.Vector3(x * d, y * d, z * d)
				return new THREE.Face3(...vec3, normal)
			})
		)

		//geometry.computeVertexNormals()
		geometry.computeFaceNormals()
		geometry.normalize()

		console.log(geometry)

		return geometry
	}
}

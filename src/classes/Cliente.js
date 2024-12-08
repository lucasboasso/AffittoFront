class Cliente {
	static URL = "http://localhost:3000/api/v1/clientes";
	constructor(data) {
		this.nombre_razon_social = data.nombre;
		this.cuit = data.cuit;
		this.condicion_iva = data.iva;
		this.email = data.mail;
		this.celular = data.celular;
		this.telefono = data.telefono;
		this.domicilio = {
			localidad: data.localidad,
			calle: data.calle,
			altura: data.altura,
			piso: data.piso,
			dpto: data.dpto,
		};
	}

	static async crearCliente(data) {
		const clienteData = {
			nombre_razon_social: data.nombre,
			cuit: data.cuit,
			condicion_iva: data.iva,
			email: data.mail,
			celular: data.celular,
			telefono: data.telefono,
			domicilio: {
				localidad: data.localidad,
				calle: data.calle,
				altura: data.altura,
				piso: data.piso,
				dpto: data.dpto,
			},
			usuario: data.usuario,
		};

		try {
			const response = await fetch(this.URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(clienteData),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();
			console.log(result);
		} catch (error) {
			console.error("Error:", error);
		}
	}

	static async fetchClientes() {
		const listaClientes = await fetch(this.URL)
			.then((response) => response.json())
			.then((data) => data.data)
			.then((datosClientes) =>
				datosClientes.map((cliente) => {
					return {
						cuit: cliente.cuit,
						nombre_razon_social: cliente.nombre_razon_social,
						celular: cliente.celular,
						email: cliente.email,
					};
				})
			);
		return listaClientes;
	}

	static async buscarCliente(cuit) {
		const response = await fetch(`${this.URL}/${cuit}`)
			.then((response) => response.json())
			.then((data) => data.data);
		return response;
	}

	static async editarCliente(cuit, data) {
		const clienteData = {
			nombre_razon_social: data.nombre,
			cuit: data.cuit,
			condicion_iva: data.iva,
			email: data.mail,
			celular: data.celular,
			telefono: data.telefono,
			domicilio: {
				localidad: data.localidad,
				calle: data.calle,
				altura: data.altura,
				piso: data.piso,
				dpto: data.dpto,
			},
			usuario: data.usuario,
		};

		try {
			const response = await fetch(`${this.URL}/${cuit}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(clienteData),
			});

			if (!response.ok) {
				const errorDetails = await response.text();
				throw new Error(`HTTP error! status: ${response.status}, details: ${errorDetails}`);
			}

			const result = await response.json();
			console.log(result);
		} catch (error) {
			console.error("Error:", error);
		}
	}

}

export default Cliente;

"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SelectorClientes from "@/components/SelectorClientes/page";

const CrearPropiedad = async (data) => {
	const propiedad = {
		tipo: data.tipo,
		dimension: data.m2,
		estado: data.estado,
		precio: data.precio,
		moneda: data.moneda,
		descripcion: data.descripcion,
		domicilio: {
			localidad: data.localidad,
			calle: data.calle,
			altura: data.altura,
			piso: data.piso,
			dpto: data.dpto,
		},
		propietario: data.clientes[0],
	};

	//fetch a la api para guardar la propiedad
	fetch("http://localhost:3000/propiedades", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(propiedad),
	})
		.then((response) => response.json())
		.then((data) => console.log(data))
		.catch((error) => console.error("Error:", error));
};

export default function CrearPropiedadPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [seleccionados, setSeleccionados] = useState([]);

	const onSubmit = (data) => {
		data = {
			...data,
			clientes: seleccionados.map((cliente) => cliente.id), //necesito que esto sea por id
		};
		CrearPropiedad(data)
			.then((data) => console.log(data))
			.catch((error) => console.error("Error:", error))
			.finally(() => {
				window.location.href = "/propiedades";
			});
	};

	return (
		<div className="flex flex-1 gap-2 justify-center items-center bg-[#E8EFFF] p-4">
			<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-[600px] w-2/3">
				<h2 className="text-2xl font-bold mb-4">
					Ingrese los datos de la nueva propiedad
				</h2>
				<form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
					<fieldset className={styles.fieldset}>
						<label htmlFor="tipo" className={styles.label}>
							Tipo vivienda *
						</label>
						<select
							name="tipo"
							id="tipo"
							className={styles.inputs + (errors.tipo && styles.inputError)}
							{...register("tipo", {
								required: {
									value: true,
									message: "Tipo de propiedad es requerido",
								},
							})}
						>
							<option value="">Seleccione</option>
							<option value="Casa">Casa</option>
							<option value="Departamento">Departamento</option>
							<option value="Local">Local</option>
							<option value="Oficina">Oficina</option>
							<option value="Terreno">Terreno</option>
							<option value="Otro">Otro</option>
						</select>
					</fieldset>
					<fieldset className={styles.fieldset}>
						<label htmlFor="m2" className={styles.label}>
							Dimensión (m²)
						</label>
						<input
							type="number"
							name="m2"
							min={0}
							id="m2"
							className={styles.inputs}
							{...register("m2")}
						/>
					</fieldset>
					<fieldset className={styles.fieldset}>
						<label htmlFor="estado" className={styles.label}>
							Estado *
						</label>
						<select
							name="estado"
							id="estado"
							className={styles.inputs + (errors.estado && styles.inputError)}
							{...register("estado", {
								required: {
									value: true,
									message: "Estado es requerido",
								},
							})}
						>
							<option value="">Seleccione</option>
							<option value="Disponible">Disponible</option>
							<option value="Ocupada">Ocupada</option>
							<option value="No disponible">No disponible</option>
						</select>
					</fieldset>
					<div>
						<div className="flex flex-wrap justify-center mb-4">
							<fieldset className="mr-2 flex items-center">
								<label htmlFor="precio" className={styles.label}>
									Precio
								</label>
								<input
									min={0}
									type="number"
									name="precio"
									id="precio"
									className={
										styles.inputs + (errors.precio && styles.inputError)
									}
									{...register("precio", {
										min: {
											value: 0,
											message: "Precio no puede ser negativo",
										},
									})}
								/>
							</fieldset>
							<fieldset className="flex items-center">
								<label htmlFor="moneda" className={styles.label}>
									Moneda
								</label>
								<select
									name="moneda"
									id="moneda"
									className={styles.inputs}
									{...register("moneda")}
								>
									<option value="">Seleccione</option>
									<option value="ARS">ARS</option>
									<option value="USD">USD</option>
								</select>
							</fieldset>
						</div>
					</div>
					<fieldset className="mb-4">
						<label htmlFor="descripcion" className={styles.label}>
							Descripción
						</label>
						<textarea
							name="descripcion"
							id="descripcion"
							cols="50"
							rows="10"
							placeholder="Condiciones de alquiler, cochera, expensas, etc."
							className={styles.inputs + " resize-none"}
							{...register("descripcion", {
								maxLength: {
									value: 500,
									message: "No puede superar los 200 caracteres",
								},
							})}
						></textarea>
					</fieldset>
					<div className="mb-4">
						<fieldset className={styles.fieldset}>
							<label htmlFor="localidad" className={styles.label}>
								Localidad *
							</label>
							<select
								name="localidad"
								id="localidad"
								className={
									styles.inputs + (errors.localidad && styles.inputError)
								}
								{...register("localidad", {
									required: {
										value: true,
										message: "Localidad es requerida",
									},
								})}
							>
								<option value="">Seleccione</option>
								<option value="Capital Federal">Capital Federal</option>
								<option value="Rosario">Rosario</option>
								<option value="Santa Fe">Santa Fe</option>
							</select>
						</fieldset>
						<fieldset className={styles.fieldset}>
							<label htmlFor="calle" className={styles.label}>
								Calle *
							</label>
							<input
								type="text"
								name="calle"
								id="calle"
								className={
									styles.inputs + (errors.localidad && styles.inputError)
								}
								{...register("calle", {
									required: {
										value: true,
										message: "Calle es requerida",
									},
								})}
							/>
						</fieldset>
						<div className="flex">
							<fieldset className="mr-2">
								<label htmlFor="altura" className={styles.label}>
									Altura
								</label>
								<input
									type="text"
									name="altura"
									id="altura"
									className={styles.inputs}
									{...register("altura")}
								/>
							</fieldset>
							<fieldset className="mr-2">
								<label htmlFor="piso" className={styles.label}>
									Piso
								</label>
								<input
									type="text"
									name="piso"
									id="piso"
									placeholder="-"
									className={styles.inputs}
									{...register("piso")}
								/>
							</fieldset>
							<fieldset>
								<label htmlFor="dpto" className={styles.label}>
									Dpto
								</label>
								<input
									type="text"
									name="dpto"
									id="dpto"
									placeholder="-"
									className={styles.inputs}
									{...register("dpto")}
								/>
							</fieldset>
						</div>
					</div>
					<button className={styles.button} type="submit">
						Crear Propiedad
					</button>
				</form>
			</div>
			<SelectorClientes
				setSeleccionados={setSeleccionados}
				titulo={"Propietarios"}
			/>
		</div>
	);
}

const styles = {
	inputError: "border border-red-500 text-red-500",
	fieldset: "flex justify-center items-center mb-4",
	label: "block text-gray-700 text-sm font-bold mr-2 w-1/3",
	inputs:
		"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
	errors: "text-red-500 mb-4",
	button:
		"bg-blue-900 text-white border-2 border-blue-500 px-16 py-2 rounded-full text-xl hover:bg-blue-700 transition-all active:translate-y-1",
};

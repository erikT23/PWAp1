function realizarTareasEncadenadas() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const numeroAleatorio = Math.floor(Math.random() * 100) + 1;
            console.log("Primera promesa:", numeroAleatorio);
            resolve(numeroAleatorio);
        }, 2000);
    })
        .then((numero) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const resultadoCuadrado = numero * numero;
                    console.log("Segunda promesa :", resultadoCuadrado);
                    resolve(resultadoCuadrado);
                }, 3000);
            });
        })
        .then((resultadoCuadrado) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const raizCuadrada = Math.sqrt(resultadoCuadrado);
                    console.log("Tercera promesa :", raizCuadrada);
                    resolve(raizCuadrada);
                }, 1000);
            });
        });
}

realizarTareasEncadenadas()
    .then((resultado) => {
        console.log("Resultado final:", resultado);
    })
    .catch((error) => {
        console.error("Error:", error);
    });

//EJERCICIO 2

function realizarSolicitudesGET(urls) {
    const promesas = [];

    for (const url of urls) {
        const promesa = fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`La solicitud a ${url} falló con estado ${response.status}`);
                }
                return response.json();
            })
            .catch((error) => {
                console.error(`Error en la solicitud a ${url}:`, error);
                return null;
            });

        promesas.push(promesa);
    }

    return Promise.all(promesas);
}

const urls = [
    'https://reqres.in/api/users?page=1',
    'https://reqres.in/api/users?page=2'
];

realizarSolicitudesGET(urls)
    .then((resultados) => {
        console.log("Resultados de las solicitudes:", resultados);
    })
    .catch((error) => {
        console.error("Error en las solicitudes:", error);
    });

//EJERCICIO 3

function ejecutarPromesasParalelas(funcionesPromesa) {
    const promesas = funcionesPromesa.map((func) => func());

    return Promise.all(promesas);
}

// Ejemplo de uso:
const promesa1 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Resultado de la promesa 1");
        }, 2000);
    });
};

const promesa2 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Resultado de la promesa 2");
        }, 3000);
    });
};

const promesa3 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Resultado de la promesa 3");
        }, 1000);
    });
};

const funcionesPromesa = [promesa1, promesa2, promesa3];

ejecutarPromesasParalelas(funcionesPromesa)
    .then((resultados) => {
        console.log("Resultados de las promesas:", resultados);
    })
    .catch((error) => {
        console.error("Error en las promesas:", error);
    });

//EJERCICIO 4

function promesasEnCadenaConRetraso(n) {
    const promesas = [];
    for (let i = 1; i <= n; i++) {
        const numero = i;
        const promesa = new Promise((resolve) => {
            setTimeout(() => {
                console.log("Promesa resuelta con el número:", numero);
                resolve(numero);
            }, numero * 1000);
        });
        promesas.push(promesa);
    }

    return Promise.all(promesas).then(() => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("Todas las promesas se resolvieron");
            }, n * 1000);
        });
    });
}
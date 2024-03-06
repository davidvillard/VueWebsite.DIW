# Vue Web Project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development (¡IMPORTANT!)
```
npm run serve
npm run start-server
npm run json-server
```

### Compiles and minifies for production
```
npm run build
```

---

### Examen Vue

##### @blur:

- Directiva de escucha de eventos. En nuestro caso escucha el metodo validarDni y lo valida a tiempo real


##### v-model:

- Utilizado en los inputs para tener x dato actualizado en nuestro componente


##### @click:

- Se utiliza para manejar eventos al darle click a un elemento HTML

### Json-Server

- Cuando recogemos informacion de una api (json) para recoger los datos utilizamos el "." para acceder a sus atributos:

```html

<tr v-for="cliente in clientes" :key="cliente.id" class="text-center">
        <td>{{ cliente.nombre }}</td>
        <td>{{ cliente.apellido }}</td>
        <td>{{ cliente.dni }}</td>
        <td>{{ cliente.email }}</td>
        <td>
          <div class="btn-group" role="group">
            <button class="btn btn-warning" type="button" @click="modificarCliente(cliente.id)">
              <i class="bi bi-pencil-fill"></i>
            </button>
            <button class="btn btn-danger" type="button" @click="eliminarCliente(cliente.id)">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </td>
      </tr>

```

- Recorremos los datos cogiendo el id de cada cliente (cliente.id) y mostramos en la tabla sus caracteristicas entre ( "{{  }}" )
- Veremos que para recoger los datos de una base de datos (mongoDB) tendremos que usar "_" en vez de solo "." : "cliente._id"






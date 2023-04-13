const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

// Crear una instancia de Express
const app = express();

// Crear una instancia de Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

// Definir un modelo de datos
const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Crear una tabla en la base de datos
sequelize.sync({ force: true }).then(() => {
  console.log('Base de datos sincronizada');
});

// Configurar Express para aceptar datos JSON
app.use(express.json());

// Crear una ruta para obtener todos los productos
app.get('/products', async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

// Crear una ruta para obtener un producto por ID
app.get('/products/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Crear una ruta para crear un nuevo producto
app.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Crear una ruta para actualizar un producto existente
app.put('/products/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    try {
      await product.update(req.body);
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Crear una ruta para eliminar un producto existente
app.delete('/products/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    await product.destroy();
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Iniciar el servidor de Express
app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});

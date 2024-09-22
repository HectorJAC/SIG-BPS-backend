const express = require('express');
const cors = require('cors');
const db = require('./models');
const port = require('./config/port');

const app = express();
app.use(express.json());
app.use(cors());

// Routes

// Login
const loginRoutes = require('./routers/login.routes');
app.use('/login', loginRoutes);

// Forget password
const forgetPasswordRoutes = require('./routers/forgetPassword.routes');
app.use('/forget_password', forgetPasswordRoutes);

// Usuarios
const usuariosRoutes = require('./routers/usuarios.routes');
app.use('/usuarios', usuariosRoutes);

// Empresas
const empresasRoutes = require('./routers/empresas.routes');
app.use('/empresas', empresasRoutes);

// Roles
const rolesRoutes = require('./routers/roles.routes');
app.use('/roles', rolesRoutes);

// Pedidos
const pedidosRoutes = require('./routers/pedidos.routes');
app.use('/pedidos', pedidosRoutes);

// Dashboards Kibana
const dashboardKibanaRoutes = require('./routers/dashboardKibana.routes');
app.use('/dashboard_kibana', dashboardKibanaRoutes);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
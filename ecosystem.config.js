module.exports = {
  apps: [
    {
      name: 'Synhronization',
      script: 'dist/main.js',
      instances: 1,
      watch: true,
      env: {
        DB_HOST: "127.0.0.1",
        DB_PORT:3053,
        DB_DATABASE:"D:\\Programs\\UkrSklad7S\\db\\Sklad.tcb",
        DB_USER:"SYSDBA",
        DB_PASSWORD:"masterkey",
      }
    }
  ]
}

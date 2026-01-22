# 💰 Préstamos DApp

Una aplicación descentralizada (DApp) para gestión de préstamos construida sobre la blockchain de Ethereum.

## 📋 Descripción

Préstamos DApp es una plataforma descentralizada diseñada específicamente para los estudiantes de la UPTA, que permite solicitar, otorgar y gestionar préstamos de manera transparente y segura utilizando contratos inteligentes en la red Ethereum. La aplicación proporciona una interfaz intuitiva para interactuar con el ecosistema de préstamos descentralizados, facilitando el acceso a recursos financieros para la comunidad estudiantil.

### Características Principales

- 🔐 **Gestión Segura de Préstamos**: Contratos inteligentes auditados para transacciones seguras
- 💸 **Solicitudes de Préstamo**: Los usuarios pueden solicitar préstamos de manera descentralizada
- 📊 **Seguimiento en Tiempo Real**: Monitorea el estado de tus préstamos activos
- 🔄 **Transparencia Total**: Todas las transacciones son verificables en la blockchain
- 🌐 **Sin Intermediarios**: Interacción directa peer-to-peer mediante smart contracts

## 📜 Smart Contract Desplegado

### Red Sepolia (Testnet)

**Dirección del Contrato:** `0x7a173A15d548b48C0283D450Ec3783bc5706F0e6`

**Ver en Block Explorer:**  
🔍 [Ver contrato en Sepolia Etherscan](https://sepolia.etherscan.io/address/0x7a173A15d548b48C0283D450Ec3783bc5706F0e6)

## �️ Stack Tecnológico

- **Frontend**: Next.js 14 con TypeScript
- **Smart Contracts**: Solidity + Hardhat
- **Wallet Integration**: RainbowKit
- **Web3 Libraries**: Wagmi, Viem
- **Styling**: Tailwind CSS

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/en/download/) (>= v20.18.3)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) o [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)
- Una wallet de Ethereum (MetaMask recomendado)

## 🚀 Inicio Rápido

### 1. Clonar el Repositorio

```bash
git clone [URL_DEL_REPOSITORIO]
cd prestamos-dapp
```

### 2. Instalar Dependencias

```bash
yarn install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
DEPLOYER_PRIVATE_KEY=tu_private_key_aqui
ALCHEMY_API_KEY=tu_alchemy_api_key
```

### 4. Ejecutar Red Local

En una terminal, inicia la red local de Hardhat:

```bash
yarn chain
```

### 5. Desplegar Contratos

En una segunda terminal, despliega los contratos:

```bash
# Despliegue local
yarn deploy

# Despliegue en Sepolia
yarn deploy --network sepolia
```

### 6. Iniciar la Aplicación

En una tercera terminal, inicia la aplicación Next.js:

```bash
yarn start
```

Visita la aplicación en: `http://localhost:3000`

## 📁 Estructura del Proyecto

```
prestamos-dapp/
├── packages/
│   ├── hardhat/          # Smart contracts y scripts de despliegue
│   │   ├── contracts/    # Contratos inteligentes en Solidity
│   │   ├── deploy/       # Scripts de despliegue
│   │   └── test/         # Tests de contratos
│   └── nextjs/           # Frontend de la aplicación
│       ├── app/          # Páginas y rutas de Next.js
│       ├── components/   # Componentes de React
│       └── hooks/        # Custom hooks de Web3
└── README.md
```

## 📝 Desarrollo

- **Editar Smart Contracts**: Modifica los archivos en `packages/hardhat/contracts`
- **Editar Frontend**: Modifica la página principal en `packages/nextjs/app/page.tsx`
- **Scripts de Despliegue**: Personaliza en `packages/hardhat/deploy`

## 🌐 Despliegue en Producción

Para desplegar en la red principal de Ethereum u otras redes:

1. Asegúrate de tener fondos suficientes en tu wallet
2. Configura las credenciales de red en `packages/hardhat/hardhat.config.ts`
3. Ejecuta el script de despliegue para la red deseada

## 📚 Recursos

- [Documentación de Scaffold-ETH 2](https://docs.scaffoldeth.io)
- [Documentación de Hardhat](https://hardhat.org/docs)
- [Documentación de Next.js](https://nextjs.org/docs)
- [Sepolia Testnet Faucet](https://sepoliafaucet.com/)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Forkea el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autor

[Tu Nombre] - [Tu Email/GitHub]

## 🙏 Agradecimientos

Construido con [Scaffold-ETH 2](https://scaffoldeth.io) - Un toolkit para construcción de dApps en Ethereum.

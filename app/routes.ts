import { type RouteConfig } from "@react-router/dev/routes"

export default [
    {
        path: "", 
        file: "routes/index.tsx" 
    },
    {
        path: ":locale", 
        file: "routes/$locale/_app.tsx", 
        children: [
            {
                path: "", 
                file: "routes/$locale/home.tsx"  
            },
            {
                path: "funcionalidades",
                file: "routes/$locale/funcionalidades.tsx"
            },
            {
                path: "hardware",
                file: "routes/$locale/hardware.tsx"
            },
            {
                path: "precios",
                file: "routes/$locale/precios.tsx"
            }
        ]
    }
] satisfies RouteConfig
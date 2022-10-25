({
    appDir: "./",
    baseUrl: 'js/',
    dir: "../book-built",
    paths: {
        "requireLib": "require"
    },
    optimizeCss: "standard",
    optimizeJs: "standard",
    modules: [
         {
             name: "main",
             include: 'requireLib'
         }
    ]
})
module.exports = {
    default: {
        options: {
            sourcemap: 'file',
            style: 'compressed'
        },
        files: [{
            expand: true,
            cwd: 'src/sass',
            src: ['home/Home.scss', 'item-page/ItemPage.scss'],
            dest: 'dist/styles/default',
            //dest: '/home/michelepagnin/Programmazione/mini-group/item-front-end/dist/styles/default',
            ext: '.css'
        }]
    }
};
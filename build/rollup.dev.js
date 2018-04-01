// Rollup plugins
import * as path from 'path';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import license from 'rollup-plugin-license';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import typescript from 'rollup-plugin-typescript2';
import * as jsonfile from 'jsonfile';

const pkg = jsonfile.readFileSync('./package.json');

export default {
    entry: 'src/' + pkg.name + '.ts',
    dest: 'dist/' + pkg.name + (process.env.NODE_ENV === 'production' ? '.min' : '') + '.js',
    format: 'umd',
    moduleName: pkg.name.replace(/^\w/, starter => starter.toUpperCase()),
    sourceMap: process.env.NODE_ENV === 'production',
    plugins: [
        typescript(),
        babel({
            exclude: 'node_modules/**'
        }),
        (process.env.NODE_ENV === 'production' && uglify()),
        license({
            banner: {
                file: path.join(__dirname, 'src', 'BANNER')
            },
            thirdParty: {
                output: path.join(__dirname, '../dist', 'dependencies.txt'),
                includePrivate: true
            }
        }),
        serve({
            contentBase: './',
            open: true
        })
        // livereload()
    ]
};

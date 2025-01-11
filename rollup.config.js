import terser from '@rollup/plugin-terser'
import multi from '@rollup/plugin-multi-entry'

export default [
    {
        input: {
            include: [
                'scripts/*.js'
            ],
            exclude: [
                'scripts/actor-programmer.min.js']
        },
        output: {
            format: 'esm',
            file: 'scripts/actor-programmer.min.js',
            sourcemap: true
        },
        plugins: [
            terser({ keep_classnames: true, keep_fnames: true }),
            multi()
        ]
    }
]

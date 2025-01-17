import { PluginObj, traverse } from '@babel/core'
import generate from '@babel/generator'
import { parse } from '@babel/parser'
import { expect, test } from 'vitest'

export const cwd = 'root/src'
export const file = 'test.tsx'
process.cwd = () => cwd

const removeExtraSpaces = (str: string) => {
    return str.replace(/ {2,}/g, ' ').replace(/[\t\n] ?/g, '')
}

export function assertTransform(
    src: string,
    expected: string,
    plugin: PluginObj<any>,
    trim = false,
) {
    const ast = parse(src, {
        sourceType: 'module',
        plugins: ['jsx'],
    })

    traverse(ast, plugin.visitor, undefined, { filename: `${cwd}/${file}` })
    const res = generate(ast)
    const output = trim ? removeExtraSpaces(res.code) : res.code
    const expectedOutput = trim ? removeExtraSpaces(expected) : expected

    expect(output).toBe(expectedOutput)
}

export function testTransform(
    name: string,
    src: string,
    expected: string,
    plugin: PluginObj<any>,
    trim = false,
) {
    test(name, () => {
        assertTransform(src, expected, plugin, trim)
    })
}

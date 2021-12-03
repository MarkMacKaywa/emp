import webpack from 'webpack'
import path from 'path'
import {getTSConfig} from './src/getTSConfig'
import {getTSService} from './src/getTSService'
import {emitFile} from './src/emitFile'
import {ResovleConfig} from 'src/config'
import store from 'src/helper/store'

export interface LoaderOptions {
  name?: string
  exposes?: Record<string, string>
  typesOutputDir: string
}
function main(context: webpack.LoaderContext<Partial<LoaderOptions>>, loaderOptions: LoaderOptions, content: string) {
  const tsconfig = getTSConfig(context.rootContext)
  const languageService = getTSService(
    {
      ...tsconfig,
      declaration: true,
      emitDeclarationOnly: true,
      outDir: path.resolve(context.rootContext, `${loaderOptions.typesOutputDir}/${loaderOptions.name}/dts`),
    },
    context.rootContext,
  )
  emitFile(context, languageService, loaderOptions)

  return content
}

/**
 * DTSLoader
 * 生成 EMP MF Typescript 声明文件
 * @param this
 * @param source
 * @returns
 */
async function DTSloader(this: webpack.LoaderContext<LoaderOptions>, source: string) {
  const done = this.async()
  const options = this.getOptions()
  done(null, source)
  return main(
    this,
    {
      name: options.name,
      exposes: options.exposes,
      typesOutputDir: options.typesOutputDir ?? path.resolve('', '.types'),
    },
    source,
  )
}

export default DTSloader

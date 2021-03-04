export async function registerApp(spa, app) {
  const func = app.hash ? hashPrefix(app) : pathPrefix(app)
  let store = null;

  if (app.store) {
    try {
      store = await System.import(app.store)
    } catch (e) {
      throw new Error(`应用 ${app.name}的 store：${app.store}加载失败`)
    }
  }

  spa.registerApplication(
    app.name,
    () => System.import(app.main),
    app.base ? (() => true) : func,
    {
      store
    }
  )

}
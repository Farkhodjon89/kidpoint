import client from '../apollo/apollo-client'
import CATEGORIES from '../queries/categories'

const fetchCategories = async () => {
  const list = []

  const fetchAllCategories = async after => {
    const response = await client.query({
      query: CATEGORIES,
      fetchPolicy: 'no-cache',
      variables: {
        first: 100,
        ...(after ? { after } : {})
      }
    })

    list.push(
      ...response.data.productCategories.nodes
        .filter(category => category.slug !== 'uncategorized')
        .map(category => ({
          ...category,
          id: category.databaseId,
          parent: category.parent && category.parent.node ? category.parent.node.slug : null,
          children: category.children ? category.children.nodes.map(({ slug }) => slug) : []
        }))
    )

    if (response.data.productCategories.pageInfo.hasNextPage) {
      await fetchAllCategories(response.data.productCategories.pageInfo.endCursor)
    }
  }

  await fetchAllCategories()

  const main = list.filter(category => category.parent == null)

  return {
    list,
    main
  }
}

export class StaticData {
  constructor(categories) {
    this.categories = categories || {
      list: [],
      main: []
    }
  }
}

export class StaticDataSingleton {
  constructor() {
    if (!StaticDataSingleton.instance) {
      StaticDataSingleton.instance = new StaticData()
    }
  }

  getInstance() {
    return StaticDataSingleton.instance
  }

  async checkAndFetch(force = false) {
    const staticData = new StaticDataSingleton().getInstance()

    const isCategoriesEmpty = staticData.categories.list.length === 0

    if (force || isCategoriesEmpty) {
      try {
        staticData.categories = await fetchCategories()
      } catch (e) {
        console.log('L39 e:', e)

        staticData.categories = {
          list: [],
          main: []
        }
      }
    }
  }

  getRootCategories() {
    const staticData = new StaticDataSingleton()
    const staticData2 = new StaticDataSingleton().getInstance()

    return staticData2.categories.main.map(({ slug }) => staticData.getCategoryBySlug(slug, 2))
  }

  getCategoryBySlug(slug, childrenDeepLevel = 0) {
    const staticData = new StaticDataSingleton().getInstance()

    const category = staticData.categories.list.find(c => c.slug === slug)
    const parentCategory = category?.parent ? staticData.categories.list.find(c => c.slug === category.parent) : null

    if (childrenDeepLevel === 0) {
      return {
        ...category,
        parent: parentCategory,
        children: []
      }
    } else {
      return {
        ...category,
        parent: parentCategory,
        children: category?.children.map(slug =>
          new StaticDataSingleton().getCategoryChildren(slug, childrenDeepLevel - 1)
        )
      }
    }
  }

  getCategoryChildren(slug, level = 0) {
    const staticData = new StaticDataSingleton().getInstance()

    const category = staticData.categories.list.find(c => c.slug === slug)

    if (!category?.children || level === 0 || category.children.length === 0) {
      return {
        ...category,
        children: []
      }
    }

    return {
      ...category,
      children: category.children.map(slug => new StaticDataSingleton().getCategoryChildren(slug, level - 1))
    }
  }

  getAllChildrenSlugs(slug, result) {
    const staticData = new StaticDataSingleton().getInstance()

    const slugs = staticData.categories.list.filter(({ parent }) => parent === slug).map(({ slug }) => slug)

    if (!slugs.length) {
      return
    }

    result.push(...slugs)

    const childSlugs = slugs.map(slug => new StaticDataSingleton().getAllChildrenSlugs(slug, result))

    if (!childSlugs.length || !childSlugs[0]) {
      return
    }

    result.push(...childSlugs)
  }
}

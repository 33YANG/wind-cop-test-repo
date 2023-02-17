namespace Types {
  /**
   * 商品数据
   */
  interface ProductType {
    key: string
    price: number
    label: string
    image: string
  }

  /**
   * 商品卡片组件的props
   */
  interface ProductCardProps {
    data: ProductType
    addCartData: (data: ProductType) => void
  }

  /**
   * 购物车数据
   */
  interface CartInfo {
    price: number
    label: string
    count: number
  }
}

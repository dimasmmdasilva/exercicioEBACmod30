import { useState } from 'react'
import { Provider } from 'react-redux'
import { GlobalStyle } from './styles'
import Header from './components/Header'
import ProdutosComponent from './containers/Produtos'
import { store } from './store'

export type Produto = {
  id: number
  nome: string
  preco: number
  imagem: string
}

function App() {
  const [favoritos, setFavoritos] = useState<Produto[]>([])

  const favoritar = (produto: Produto) => {
    if (favoritos.find((p) => p.id === produto.id)) {
      const favoritosSemProduto = favoritos.filter((p) => p.id !== produto.id)
      setFavoritos(favoritosSemProduto)
    } else {
      setFavoritos([...favoritos, produto])
    }
  }

  return (
    <Provider store={store}>
      <GlobalStyle />
      <div className="container">
        <Header favoritos={favoritos} />
        <ProdutosComponent favoritos={favoritos} favoritar={favoritar} />
      </div>
    </Provider>
  )
}

export default App

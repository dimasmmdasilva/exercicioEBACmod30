import React, { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import { GlobalStyle } from './styles'
import Header from './components/Header'
import ProdutosComponent from './containers/Produtos'
import { store } from './store'
import { useGetProdutosQuery } from './services/api'
import { Produto } from './components/Produto'

function App() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [favoritos, setFavoritos] = useState<Produto[]>([])

  const { data: produtosData, isLoading: isLoadingProdutos } =
    useGetProdutosQuery()

  useEffect(() => {
    if (produtosData) {
      setProdutos(produtosData)
    }
  }, [produtosData])

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
        {isLoadingProdutos ? (
          <h2>Carregando...</h2>
        ) : (
          <ProdutosComponent
            produtos={produtos}
            favoritos={favoritos}
            favoritar={favoritar}
          />
        )}
      </div>
    </Provider>
  )
}

export default App

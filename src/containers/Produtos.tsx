import React from 'react'
import ProdutoComponent from '../components/Produto'
import { useGetProdutosQuery } from '../services/api'
import * as S from './styles'
import { Produto } from '../App'

type Props = {
  favoritos: Produto[]
  favoritar: (produto: Produto) => void
}

const ProdutosComponent: React.FC<Props> = ({ favoritos, favoritar }) => {
  const { data: produtos, isLoading } = useGetProdutosQuery()

  if (isLoading) return <h2>Carregando...</h2>

  const produtoEstaNosFavoritos = (produto: Produto) => {
    const produtoId = produto.id
    return favoritos.some((p) => p.id === produtoId)
  }

  return (
    <S.Produtos>
      {produtos?.map((produto) => (
        <ProdutoComponent
          key={produto.id}
          produto={produto}
          favoritar={favoritar}
          estaNosFavoritos={produtoEstaNosFavoritos(produto)}
        />
      ))}
    </S.Produtos>
  )
}

export default ProdutosComponent

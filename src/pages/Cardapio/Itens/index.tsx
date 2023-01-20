import cardapio from '../../../data/cardapio.json';
import Item from './Item';
import styles from './Itens.module.scss';
import { useEffect, useState } from 'react';

interface Props {
  busca: string;
  filtro: number | null;
  ordenador: string;
}

export default function Itens(props: Props) {
  const [lista, setLista] = useState(cardapio);
  const { busca, filtro, ordenador } = props;

  const ordenarPropriedadeCrescente = (
    lista: typeof cardapio,
    propriedade: 'size' | 'serving' | 'price'
  ) => {
    return lista.sort((a, b) => (a[propriedade] > b[propriedade] ? 1 : -1));
  };

  function testaBusca(title: string) {
    const regex = new RegExp(busca, 'i');
    return regex.test(title);
  }

  function testaFiltro(id: number) {
    if (filtro !== null) return filtro === id;
    return true;
  }

  function ordenar(novaLista: typeof cardapio) {
    switch (ordenador) {
    case 'porcao':
      return ordenarPropriedadeCrescente(novaLista, 'size');
    case 'qtd_pessoas':
      return ordenarPropriedadeCrescente(novaLista, 'serving');
    case 'preco':
      return ordenarPropriedadeCrescente(novaLista, 'price');
    default:
      return novaLista;
    }
  }

  useEffect(() => {
    const novaLista = cardapio.filter(item => testaBusca(item.title) && testaFiltro(item.category.id));
    setLista(ordenar(novaLista));
  }, [busca, filtro, ordenador]);

  return (
    <div className={styles.itens}>
      {lista.map((item) => (
        <Item
          key={item.id}
          {...item}
        />
      ))}
    </div>
  );
}
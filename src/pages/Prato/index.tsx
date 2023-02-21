import styles from './Prato.module.scss';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import cardapio from 'data/cardapio.json';

export default function Prato() {
  const { state } = useLocation();
  const { prato } = state as { prato: typeof cardapio[0]};

  return (
    <>
      <button className={styles.voltar}>
        {'< Voltar'}
      </button>
      <section className={styles.container}>
        <h1 className={styles.titulo}>
          {prato.title}
        </h1>
        <div className={styles.imagem}>
          <img src={prato.photo} alt={prato.title} />
        </div>
        <div className={styles.conteudo}>
          <p className={styles.conteudo__descricao}>
            {prato.description}
          </p>
          <div className={styles.tags}>
            <div className={classNames({
              [styles.tags__tipo]: true,
              [styles[`tags__tipo__${prato.category.label.toLowerCase()}`]]: true
            })}>
              {prato.category.label}
            </div>
            <div className={styles.tags__porcao}>
              {prato.size}g
            </div>
            <div className={styles.tags__qtdpessoas}>
              Serve {prato.serving} pessoa{prato.serving === 1 ? '' : 's'}
            </div>
            <div className={styles.tags__valor}>
              R$ {prato.price.toFixed(2)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
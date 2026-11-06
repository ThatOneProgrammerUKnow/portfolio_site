import Badge from '../../../../components/Badge/Badge';
import Headline from '../../../../components/Headline/Headline';
import './MyProductsHeroSection.css';

export default function MyProductsHeroSection({ content }) {
  return (
    <section className="my-products-hero">
      <div className="container">
        <Badge>{content.badge}</Badge>
        <h1 className="display my-products-hero__title">
          <Headline title={content.title} />
        </h1>
        <p className="lead my-products-hero__lead">{content.lead}</p>
      </div>
    </section>
  );
}

import { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  Text,
  Link,
  Field,
  ImageField,
  LinkField,
  withDatasourceCheck,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type PromoCTAProps = ComponentProps & {
  fields: {
    PromoImage: ImageField;
    PromoTitle: Field<string>;
    PromoDescription: Field<string>;
    PromoLink: LinkField;
  };
};

const PromoCTA = ({ fields }: PromoCTAProps): JSX.Element => (
  <div className="col-12 col-md-6">
    <div className="card-item">
      <Link field={fields.PromoLink} className="card-item__image">
        <ContentSdkImage field={fields.PromoImage} />
      </Link>
      <Text tag="h2" className="h2-styling" field={fields.PromoTitle} />
      <Text tag="p" field={fields.PromoDescription} />
      <Link field={fields.PromoLink} className="btn btn-secondary" />
    </div>
  </div>
);

export default withDatasourceCheck()<PromoCTAProps>(PromoCTA);
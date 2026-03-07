import React, { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  RichText as ContentSdkRichText,
  Field,
  ImageField,
  Link,
  LinkField,
  RichTextField,
  Text,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  PromoImageOne: ImageField;
  PromoTitle: Field<string>;
  PromoDescription: RichTextField;
  PromoSubTitle: Field<string>;
  PromoMoreInfo: LinkField;
}

export type PromoProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  return (
    <section className={props.params.styles} id={id ? id : undefined}>
      <div>
        <div>
          <ContentSdkImage field={props.fields.PromoImageOne} />
        </div>

        <div>
          <div>
            <Text field={props.fields.PromoSubTitle} />
          </div>

          <h2>
            <Text field={props.fields.PromoTitle} />
          </h2>

          <ContentSdkRichText field={props.fields.PromoDescription} />

          <Link field={props.fields.PromoMoreInfo} />
        </div>
      </div>
    </section>
  );
};

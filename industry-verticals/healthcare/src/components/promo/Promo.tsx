'use client';

import React from 'react';
import {
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  ImageField,
  Field,
  LinkField,
  RichTextField,
  ComponentRendering,
  ComponentParams,
  Placeholder,
  withDatasourceCheck,
} from '@sitecore-content-sdk/nextjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import BlobAccent from '../non-sitecore/BlobAccent';
import CurvedClip from '../non-sitecore/CurvedClip';
import { CommonStyles } from '@/types/styleFlags';

interface Fields {
  PromoImageOne: ImageField;
  PromoTitle: Field<string>;
  PromoDescription: RichTextField;
  PromoMoreInfo: LinkField;
}

type PromoProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const PromoWrapper = ({ children, props }: { children: React.ReactNode; props: PromoProps }) => {
  const id = props.params.RenderingIdentifier;
  const hideBlobAccent = props.params.styles?.includes(CommonStyles.HideBlobAccent);
  const curvedTop = props.params.styles?.includes(CommonStyles.CurvedTop);
  const curvedBottom = props.params.styles?.includes(CommonStyles.CurvedBottom);

  return (
    <section
      className={`component promo bg-background-secondary dark:bg-background-secondary-dark relative py-12 sm:py-20 lg:py-32 ${props?.params?.styles}`}
      id={id ? id : undefined}
    >
      {curvedTop && <CurvedClip className="top-0" pos="top" />}
      {curvedBottom && <CurvedClip className="bottom-0" pos="bottom" />}
      {!hideBlobAccent && (
        <BlobAccent
          size="lg"
          className="absolute top-0 left-0 z-0 lg:left-4 lg:[.promo-reversed_&]:right-4 lg:[.promo-reversed_&]:left-auto"
        />
      )}
      <div className="relative z-10 container">
        <div className="grid items-center gap-x-24 gap-y-12 lg:grid-cols-2">
          <div className="shadow-soft aspect-square overflow-hidden rounded-lg">
            <ContentSdkImage
              field={props.fields.PromoImageOne}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="lg:[.promo-reversed_&]:order-first">{children}</div>
        </div>
      </div>
    </section>
  );
};

const DefaultPromo = (props: PromoProps) => {
  return (
    <PromoWrapper props={props}>
      <h2>
        <ContentSdkText field={props.fields.PromoTitle} />
      </h2>
      <ContentSdkRichText className="mb-10 text-lg" field={props.fields.PromoDescription} />

      <ContentSdkLink field={props.fields.PromoMoreInfo} className="btn btn-icon">
        {props.fields?.PromoMoreInfo?.value?.text}
        <FontAwesomeIcon icon={faArrowRight} />
      </ContentSdkLink>
    </PromoWrapper>
  );
};

const WithPlaceholderPromo = (props: PromoProps) => {
  return (
    <PromoWrapper props={props}>
      <h2>
        <ContentSdkText field={props.fields.PromoTitle} />
      </h2>
      <Placeholder
        name={`promo-content-${props?.params?.DynamicPlaceholderId}`}
        rendering={props.rendering}
      />
    </PromoWrapper>
  );
};

/**
 * BlueCTA variant: Erlanger-style CTA with no image.
 * Title as h5, description, and an inset-style link using Nova Medical colors.
 */
const BlueCTAPromo = (props: PromoProps) => {
  const id = props.params.RenderingIdentifier;
  const hideBlobAccent = props.params.styles?.includes(CommonStyles.HideBlobAccent);
  const curvedTop = props.params.styles?.includes(CommonStyles.CurvedTop);
  const curvedBottom = props.params.styles?.includes(CommonStyles.CurvedBottom);
  const linkText = props.fields?.PromoMoreInfo?.value?.text;

  return (
    <section
      className={`component promo promo-blue-cta bg-background-secondary dark:bg-background-secondary-dark relative py-12 sm:py-20 lg:py-32 ${props?.params?.styles}`}
      id={id ? id : undefined}
    >
      {curvedTop && <CurvedClip className="top-0" pos="top" />}
      {curvedBottom && <CurvedClip className="bottom-0" pos="bottom" />}
      {!hideBlobAccent && (
        <BlobAccent
          size="lg"
          className="absolute top-0 left-0 z-0 lg:left-4 lg:[.promo-reversed_&]:right-4 lg:[.promo-reversed_&]:left-auto"
        />
      )}
      <div className="relative z-10 container">
        <div className="max-w-3xl">
          <ul className="m-0 list-none p-0">
            <li>
              <h5 className="font-heading text-foreground dark:text-foreground-dark mb-2 text-lg font-semibold">
                <ContentSdkText field={props.fields.PromoTitle} />
              </h5>
              <ContentSdkRichText
                className="text-foreground/90 dark:text-foreground-secondary-dark/90 mb-4 text-base"
                field={props.fields.PromoDescription}
              />
              <ContentSdkLink
                field={props.fields.PromoMoreInfo}
                className="promo-blue-cta__inset-link font-heading text-foreground dark:text-foreground-dark border-accent hover:bg-background-tertiary dark:hover:bg-foreground/10 block w-fit rounded-r-md border-l-4 py-2 pl-4 text-lg font-semibold transition-colors"
                aria-label={linkText ? `click to navigate to ${linkText}` : undefined}
              >
                {linkText}
              </ContentSdkLink>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

/**
 * WhiteCTA variant: Erlanger-style card CTA with no image.
 * White/light card, h5 title, description, and inset-style link using Nova Medical styling.
 */
const WhiteCTAPromo = (props: PromoProps) => {
  const id = props.params.RenderingIdentifier;
  const hideBlobAccent = props.params.styles?.includes(CommonStyles.HideBlobAccent);
  const curvedTop = props.params.styles?.includes(CommonStyles.CurvedTop);
  const curvedBottom = props.params.styles?.includes(CommonStyles.CurvedBottom);
  const linkText = props.fields?.PromoMoreInfo?.value?.text;
  const titleValue = props.fields?.PromoTitle?.value;

  return (
    <section
      className={`component promo promo-white-cta bg-background-secondary dark:bg-background-secondary-dark relative py-12 sm:py-20 lg:py-32 ${props?.params?.styles}`}
      id={id ? id : undefined}
    >
      {curvedTop && <CurvedClip className="top-0" pos="top" />}
      {curvedBottom && <CurvedClip className="bottom-0" pos="bottom" />}
      {!hideBlobAccent && (
        <BlobAccent
          size="lg"
          className="absolute top-0 left-0 z-0 lg:left-4 lg:[.promo-reversed_&]:right-4 lg:[.promo-reversed_&]:left-auto"
        />
      )}
      <div className="relative z-10 container">
        <div className="card bg-background dark:bg-background-dark shadow-soft rounded-lg p-6 sm:p-8">
          <div>
            <h5
              className="font-heading text-foreground dark:text-foreground-dark mb-2 text-lg font-semibold"
              aria-label={titleValue ?? undefined}
            >
              <ContentSdkText field={props.fields.PromoTitle} />
            </h5>
            <ContentSdkRichText
              className="text-foreground/90 dark:text-foreground-secondary-dark/90 mb-4 text-base"
              field={props.fields.PromoDescription}
            />
            <ContentSdkLink
              field={props.fields.PromoMoreInfo}
              className="promo-white-cta__inset-link font-heading text-accent dark:text-accent border-accent hover:bg-background-tertiary dark:hover:bg-foreground/10 block w-fit rounded-r-md border-l-4 py-2 pl-4 text-lg font-semibold tracking-[0.175em] uppercase transition-colors"
              aria-label={linkText ? `click to navigate to ${linkText}` : undefined}
            >
              {linkText}
            </ContentSdkLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Default = withDatasourceCheck()<PromoProps>(DefaultPromo);
export const WithPlaceholder = withDatasourceCheck()<PromoProps>(WithPlaceholderPromo);
export const BlueCTA = withDatasourceCheck()<PromoProps>(BlueCTAPromo);
export const WhiteCTA = withDatasourceCheck()<PromoProps>(WhiteCTAPromo);

import React from "react";

const makeTitle = (title, name) =>
  title === name ? title : `${title} – ${name}`;

const Meta = ({
  as: ElementType = React.Fragment,
  name = "GeatStore", // site name
  title = "The best selection of NFTs printed on the merch.", // page title
  description,
  image = "https://api.geatstore.com/uploads/Meta_image_link_Geat_Store_3f2de26315.png",
  color = "#ec3750",
  manifest = "#",
  children,
}) => (
  <ElementType>
    <meta key="og_locale" property="og:locale" content="en_US" />
    <meta key="og_type" property="og:type" content="website" />
    <meta key="og_site" property="og:site_name" content={name} />
    <meta key="tw_site" name="twitter:site" content="@geatstore" />
    <title key="title">{makeTitle(title, name)}</title>
    <meta key="og_title" property="og:title" content={makeTitle(title, name)} />
    <meta
      key="tw_title"
      name="twitter:title"
      content={makeTitle(title, name)}
    />
    {description && (
      <React.Fragment>
        <meta key="desc" name="description" content={description} />
        <meta key="og_desc" property="og:description" content={description} />
        <meta key="tw_desc" name="twitter:description" content={description} />
      </React.Fragment>
    )}
    {image && (
      <React.Fragment>
        <meta key="og_img" property="og:image" content={image} size="512x512" />
        <meta key="tw_card" name="twitter:card" content="summary_large_image" />
        <meta key="tw_img" name="twitter:image" content={image} />
      </React.Fragment>
    )}
    <meta key="theme_color" name="theme-color" content={color} />
    <meta key="tile_color" name="msapplication-TileColor" content={color} />
    <link
      key="safari_icon"
      rel="mask-icon"
      href="https://api.geatstore.com/uploads/Geat_Store_Five_Icon_f4684a2f48.png"
      color={color}
    />
    <link
      key="apple_icon"
      rel="apple-touch-icon"
      sizes="180x180"
      href="https://api.geatstore.com/uploads/Geat_Store_Five_Icon_f4684a2f48.png"
    />
    <link
      key="favicon_32"
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="https://api.geatstore.com/uploads/Geat_Store_Five_Icon_f4684a2f48.png"
    />
    <link
      key="favicon_16"
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="https://api.geatstore.com/uploads/Geat_Store_Five_Icon_f4684a2f48.png"
    />
    {manifest && <link key="manifest" rel="manifest" href={manifest} />}
    {children}
  </ElementType>
);

export default Meta;

import { useLoaderData } from "@remix-run/react";
import { Pagination } from "@shopify/hydrogen";
import type {
  HydrogenComponentProps,
  HydrogenComponentSchema,
} from "@weaverse/hydrogen";
import { forwardRef } from "react";
import type { AllProductsQuery } from "storefrontapi.generated";
import { getImageLoadingPriority } from "~/lib/const";
import { Grid } from "~/modules/grid";
import { ProductCard } from "~/modules/product-card";
import { PageHeader, Section } from "~/modules/text";

interface AllProductsProps extends HydrogenComponentProps {
  heading: string;
  prevPageText: string;
  nextPageText: string;
  paddingTop: number;
  paddingBottom: number;
}

const AllProducts = forwardRef<HTMLElement, AllProductsProps>((props, ref) => {
  const {
    heading,
    prevPageText = "Previous",
    nextPageText = "Next",
    paddingTop = 32,
    paddingBottom = 32,
    ...rest
  } = props;
  const { products } = useLoaderData<AllProductsQuery>();

  return (
    <section
      ref={ref}
      {...rest}
      className="flex flex-col items-center w-full"
      style={{
        paddingTop: `${paddingTop}px`,
        paddingBottom: `${paddingBottom}px`,
      }}
    >
      <PageHeader heading={heading} variant="allCollections" />
      <Section>
        <Pagination connection={products}>
          {({ nodes, isLoading, NextLink, PreviousLink }) => {
            const itemsMarkup = nodes.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                loading={getImageLoadingPriority(i)}
              />
            ));

            return (
              <div>
                {/* Previous Button */}
                <div className="flex items-center justify-center mt-4">
                  <PreviousLink
                    className="inline-block rounded-md font-medium text-center py-3 px-6 border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring w-auto"
                  >
                    {isLoading ? "Loading..." : prevPageText}
                  </PreviousLink>
                </div>

                {/* Product Grid */}
                <Grid
                  data-test="product-grid"
                  className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                >
                  {itemsMarkup}
                </Grid>

                {/* Next Button */}
                <div className="flex items-center justify-center mt-4">
                  <NextLink
                    className="inline-block rounded-md font-medium text-center py-3 px-6 border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring w-auto"
                  >
                    {isLoading ? "Loading..." : nextPageText}
                  </NextLink>
                </div>
              </div>
            );
          }}
        </Pagination>
      </Section>
    </section>
  );
});

export default AllProducts;

export const schema: HydrogenComponentSchema = {
  type: "all-products",
  title: "All Products",
  limit: 1,
  enabledOn: {
    pages: ["ALL_PRODUCTS"],
  },
  inspector: [
    {
      group: "All Products",
      inputs: [
        {
          type: "text",
          name: "heading",
          label: "Heading",
          defaultValue: "All Products",
          placeholder: "All Products",
        },
        {
          type: "text",
          name: "prevPageText",
          label: "Previous Page Text",
          defaultValue: "Previous",
          placeholder: "Previous",
        },
        {
          type: "text",
          name: "nextPageText",
          label: "Next Page Text",
          defaultValue: "Next",
          placeholder: "Next",
        },
        {
          type: "range",
          name: "paddingTop",
          label: "Top Padding",
          configs: {
            min: 0,
            max: 100,
            step: 4,
            unit: "px",
          },
          defaultValue: 32,
        },
        {
          type: "range",
          name: "paddingBottom",
          label: "Bottom Padding",
          configs: {
            min: 0,
            max: 100,
            step: 4,
            unit: "px",
          },
          defaultValue: 32,
        },
      ],
    },
  ],
};

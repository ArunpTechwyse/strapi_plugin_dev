
/*
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect } from "react";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import productRequests from "../../api/product";
import {
  Layout,
  BaseHeaderLayout,
  ContentLayout,
} from "@strapi/design-system/Layout";

import { EmptyStateLayout } from "@strapi/design-system/EmptyStateLayout";
import { Button } from "@strapi/design-system/Button";
import Plus from "@strapi/icons/Plus";
import { Illo } from "../../components/illo";

import ProductModal from "../../components/ProductModal";
import ProductCount from "../../components/ProductCount";
import ProductTable from "../../components/ProductTable";

const HomePage = () => {
  const [productData, setProductData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    if (isLoading === false) setIsLoading(true);

    try {
      const product = await productRequests.getAllProducts();
      setProductData(product);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initFetchData = async () => {
      await fetchData();
    };

    initFetchData();
  }, []);

  async function addProduct(data) {
    await productRequests.addProduct(data);
    await fetchData();
  }

  async function toggleProduct(data) {
    await productRequests.toggleProduct(data.id);
  }

  async function deleteProduct(data) {
    await productRequests.deleteProduct(data.id);
    await fetchData();
  }

  async function editProduct(id, data) {
    await productRequests.editProduct(id, data);
    await fetchData();
  }

  if (isLoading) return <LoadingIndicatorPage />;

  return (
    <Layout>
      <BaseHeaderLayout
        title="Product Plugin"
        subtitle="All your products in one place."
        as="h2"
      />

      <ContentLayout>
        {productData.length === 0 ? (
          <EmptyStateLayout
            icon={<Illo />}
            content="You don't have any product yet..."
            action={
              <Button
                onClick={() => setShowModal(true)}
                variant="secondary"
                startIcon={<Plus />}
              >
                Add your first product
              </Button>
            }
          />
        ) : (
          <>
            <ProductCount count={productData.length} />
            <ProductTable
              productData={productData}
              setShowModal={setShowModal}
              toggleProduct={toggleProduct}
              deleteProduct={deleteProduct}
              editProduct={editProduct}
            />
          </>
        )}
      </ContentLayout>
      {showModal && <ProductModal setShowModal={setShowModal} addProduct={addProduct} />}
    </Layout>
  );
};

export default memo(HomePage);

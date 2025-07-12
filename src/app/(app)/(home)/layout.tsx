import configPromise from '@payload-config';
import { getPayload } from 'payload';
import type { CollectionSlug } from 'payload'
import type { Config } from '@/payload-types';


import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { SearchFilters } from "./search-filters";
import React from "react"; // Optional if you're using `React.ReactNode`

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
  const payload = await getPayload({
      config: configPromise,
    });

    const data = await payload.find({
    collection: 'categories'as CollectionSlug,
    depth: 1, // fills up subcategories , subcategories .[0] will be a type of category
    pagination: false,
    where: {
      parent: {
        exists: false,  
      },
    },
  });


interface CategoryDoc {
  subcategories?: {
    docs?: any[];
  };
  [key: string]: any; // fallback for unknown props
}

const formattedData = data.docs.map((doc: CategoryDoc) => ({
  ...doc,
  subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
    //we have this beacsue of depth 1 
    ...doc,
  })),
}));

console.log({
  data,
  formattedData,
});



  

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formattedData} />
      <div className="flex-1 bg-[#f4f4f0]">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;


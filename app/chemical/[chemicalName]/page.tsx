import { Metadata } from "next";
import ChemicalDetails from "@/pages/ChemicalDetails";

type Props = {
  params: { chemicalName: string };
  searchParams?: { [key: string]: string | string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: decodeURIComponent(params.chemicalName),
  };
}

const Page = ({ params, searchParams }: Props) => (
  <ChemicalDetails
    chemicalName={decodeURIComponent(params.chemicalName)}
    {...searchParams}
  />
);

export default Page;

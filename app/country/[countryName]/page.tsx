import { Metadata } from "next";
import CountryDetails from "@/pages/CountryDetails";

type Props = {
  params: { countryName: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: decodeURIComponent(params.countryName),
  };
}

const Page = ({ params }: Props) => (
  <CountryDetails countryName={decodeURIComponent(params.countryName)} />
);

export default Page;

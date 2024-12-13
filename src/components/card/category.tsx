import React, { Suspense } from 'react'
import { ICategory } from '@/type'
import { TbUserHexagon } from "react-icons/tb";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { BiDownArrowCircle } from "react-icons/bi";
// const LazyComponentSubCat = React.lazy(() => import('../subCategory'));
import Skeleton from '../skeleton';
import SubCategoryLayout from '../subCategory';
interface CategoryCardProps {
  singleCat: ICategory;
}

export default function CategoryCard({ singleCat }: CategoryCardProps) {
  return (
    <div className='bg-white p-4 px-6 rounded-md'>
      <Disclosure>
        <DisclosureButton className='w-full group'>
          <div className='group-data-[open]:'>
            <div className='flex justify-between items-center'>
              <div className='text-left'>
                <h3 className='text-md'>{singleCat.name}</h3>
                <p className='text-sm text-grayText'>{singleCat.description}</p>
                <p className='text-xs text-grayText flex items-center gap-1 mt-2'>
                  <TbUserHexagon />
                  <span>by</span>
                  <span className='text-primaryDark'>
                    {typeof singleCat.createdBy === 'object' && 'name' in singleCat.createdBy
                      ? singleCat.createdBy.name
                      : 'Unknown Creator'}
                  </span>
                </p>
              </div>
              <div>
                <div className='text-primaryDark text-sm flex items-center gap-2'>view deatils <BiDownArrowCircle className='text-xl group-data-[open]:rotate-180' /></div>
              </div>
            </div>
          </div>
        </DisclosureButton>
        <DisclosurePanel className="bg-white mt-4 pt-4 text-sm border-t">
          <Suspense fallback={<Skeleton />}>
            <SubCategoryLayout catId={singleCat._id} createdBy={singleCat.createdBy} />
          </Suspense>
        </DisclosurePanel>
      </Disclosure>
    </div>
  )
}

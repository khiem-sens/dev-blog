import BlogHeader from '@/components/BlogHeader';
import { getBlogDetail } from '@/server/blogs';
import { BlogDetail } from '@/types/blog';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import parse from 'html-react-parser';
import detail from './id.module.css'
import React from 'react';

const BlogPost: NextPage = ({ blogData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { author, bodyHTML, createdAt, title } = blogData;
  return (
    <section className='layout'>
      <div className='max-w-[50%]'>
        <h1 className='text-center my-10 text-[2rem] font-bold'>{title}</h1>
        <div className="flex justify-center mb-4">
            <BlogHeader createdAt={createdAt} author={author} />
        </div>
        <div className={`${detail.html} flex flex-col`}>
            {parse(bodyHTML)}
        </div>
      </div>
      
    </section>
  );
};

export default BlogPost;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const route = context.query.id;
  const id = Array.isArray(route) ? Number(route[0]) : Number(route);

  try {
    const blogData: BlogDetail = await getBlogDetail(id);
    return {
      props: {
        blogData,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};

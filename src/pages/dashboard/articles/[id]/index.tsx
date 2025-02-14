import NavThumb from '@/components/navThumb'
import Icon from '@/components/ui/icon'
import { format_price } from '@/helpers/funcs'
import { API_STORAGE, catchError, request_api } from '@/helpers/request'
import { ArticleType } from '@/helpers/type.models'
import useUser from '@/hooks/useUser'
import Head from 'next/head'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function Index({
  id
}: {
  id: number
}) {

  const { token } = useUser()
  const [loading, setLoading] = useState(false)
  const [article, setArticle] = useState<ArticleType | null>(null)

  const getArticle = async () => {

    setLoading(true)

    const response = await request_api(`/seller/store/articles/${id}`, 'GET', null, { 'Authorization': `Bearer ${token}` })

    console.log({ response });

    if (response.hasOwnProperty('success')) {
      if (response?.success) {
        setArticle(response.data.article)
      } else {
        if (response?.errors) {
          const { errors: _errors } = response
        } else {

        }
      }
    } else {
      catchError(response, () => setLoading(false))
    }

    setLoading(false)
  }

  useEffect(() => {
    if (id) {
      getArticle()
    }
  }, [id])

  return (
    <>
      <Head>

      </Head>
      <div className="">
        <NavThumb
          data={[
            {
              trigger: 'Tableau de bord',
              link: '/dashboard'
            },
            {
              trigger: 'Articles',
              link: '/dashboard/articles',
              // disabled: true
            }
          ]}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 items-start">
          <div className="space-y-4 rounded-lg p-1 border">
            <div
              className="flex h-[200px] md:h-[250px] lg:h-[300px] xl:h-[400px] bg-black rounded-lg transition relative"
              style={{
                backgroundImage: `url(${API_STORAGE}/${article?.image})`,
                backgroundAttachment: 'scroll',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'auto',
              }}
            />
            {(article?.image2 || article?.image3 || article?.image4) && (
              <div className="flex flex-wrap flex-row items-center gap-4">
                {article?.image2 && (
                  <CardImage
                    source={`${API_STORAGE}/${article?.image2}`}
                    image='image2'
                    article_id={article?.id}
                    editArticle={setArticle}
                  />
                )}
                {article?.image3 && (
                  <CardImage
                    source={`${API_STORAGE}/${article?.image3}`}
                    image='image3'
                    article_id={article?.id}
                    editArticle={setArticle}
                  />
                )}
                {article?.image4 && (
                  <CardImage
                    source={`${API_STORAGE}/${article?.image4}`}
                    image='image4'
                    article_id={article?.id}
                    editArticle={setArticle}
                  />
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col lg:col-span-2 rounded-md p-3 sm:p-4 space-y-4 bg-neutral-100">
            <div className='flex-1 space-y-4'>
              <div className="flex flex-wrap flex-row items-center gap-2">
                <span className="block">Désignation:</span>
                <h1 className="font-black">{article?.name}</h1>
              </div>
              <div className="">
                <h3 className="font-bold">Description:</h3>
                <p className="font-thin text-sm">{article?.about}</p>
              </div>
              <div className="flex flex-wrap flex-row items-end gap-2">
                <span className="block">Stock:</span>
                <h3 className="font-semibold">{loading? '...' : (article?.stock||'#')}</h3>
              </div>
              <div className="flex flex-wrap flex-row items-end gap-2">
                <span className="block">Prix:</span>
                <h3 className="font-semibold">{format_price(article?.price||0)}F CFA</h3>
              </div>
            </div>
            <Link
              href={`/dashboard/articles/${article?.id}/edit`}
              className='flex flex-row items-center gap-x-[2px] hover:underline text-neutral-400 hover:text-blue-500 dark:text-muted-foreground self-end'
            >
              <Icon.LucideEdit3 className='border w-[30px] h-[30px] p-2 rounded-full' />
              <span className="text-xs font-semibold">Modifier</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

const CardImage = ({
  source,
  article_id,
  image,
  editArticle
}: {
  source: string,
  article_id: number | undefined,
  image: string,
  editArticle: (a:ArticleType)=>void
}) => {

  const { token } = useUser()

  const [loading, setLoading] = useState(false)

  const onHandlePress = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)

    const response = await request_api(`/seller/store/articles/${article_id}/${image}/delete`, 'DELETE', null, { 'Authorization': `Bearer ${token}` })

    console.log({ response });

    if (response.hasOwnProperty('success')) {
        if (response?.success) {
          editArticle(response.data.article)
          // @ts-ignore
          // editArticle((prev: ArticleType) => ({
          //   ...prev,
          //   [image]: null
          // }))
        } else {
            if (response?.errors) {
                const { errors: _errors } = response
            } else {

            }
        }
    } else {
        catchError(response, () => setLoading(false))
    }

    setLoading(false)
  }

  return (
    <div
      className="h-[100px] w-[100px] bg-black rounded transition relative"
      style={{
        backgroundImage: `url(${source})`,
        backgroundAttachment: 'scroll',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '100%',
      }}
    >
      <button 
        type='button'
        disabled={loading}
        onClick={onHandlePress}
        className='absolute top-1 right-1 bg-neutral-200 rounded-full p-1'
      >
        {loading ? (
          <Icon.Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Icon.XIcon size={15} className='text-red-700' />
        )}
      </button>
    </div>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  }
}

export async function getStaticProps(context: any) {
  const { id } = context.params
  return {
    props: {
      id
    }
  }
}

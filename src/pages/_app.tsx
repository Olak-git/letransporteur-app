import '@/styles/globals.tw.css'
import FullContainer from '@/components/FullContainer'
import NotificationService from '@/components/NotificationService'
import NotificationWeb from '@/components/NotificationWeb'
import useMode from '@/hooks/useMode'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store from '@/store/app/store'
import { persistStore } from 'redux-persist'
import UserContextProvider from '@/providers/UserContextProvider'
import NotificationsContextProvider from '@/providers/NotificationsContextProvider'
import ShortNavContextProvider from '@/providers/ShortNavContextProvider'
import SheetContextProvider from '@/providers/SheetContextProvider'
import ModeContextProvider from '@/providers/ModeContextProvider'
import ErrorBoundary from '@/components/boundary/ErrorBoundary'
import OrdersContextProvider from '@/providers/OrdersContextProvider'
import { SocketProvider } from '@/providers/SocketProvider'

const persistor = persistStore(store)

export default function App({ Component, pageProps }: AppProps) {

  return (
    <SocketProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <UserContextProvider>
            <NotificationsContextProvider>
              <OrdersContextProvider>
                <ShortNavContextProvider>
                  <SheetContextProvider>
                    <ModeContextProvider>
                      <ErrorBoundary>
                        <Container>
                          <NotificationWeb ref={(ref) => NotificationService.setNotificationWebRef(ref)} />
                          <FullContainer>
                            <Component {...pageProps} />
                          </FullContainer>
                        </Container>
                      </ErrorBoundary>
                    </ModeContextProvider>
                  </SheetContextProvider>
                </ShortNavContextProvider>
              </OrdersContextProvider>
            </NotificationsContextProvider>
          </UserContextProvider>
        </PersistGate>
      </Provider>
    </SocketProvider>
  )
}

const Container = (props: any) => {

  const { mode } = useMode()

  useEffect(() => {
    console.log({ mode });
    if (document.querySelector('html')?.className.includes('light')) {
      document.querySelector('html')?.classList.replace('light', mode)
    } else if (document.querySelector('html')?.className.includes('dark')) {
      document.querySelector('html')?.classList.replace('dark', mode)
    } else {
      document.querySelector('html')?.classList.add(mode)
    }
  }, [mode])

  return (
    props.children
  )
}

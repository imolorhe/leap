import Reactotron, { trackGlobalErrors, openInEditor, overlay, asyncStorage, networking } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

Reactotron.configure({ name: 'Leap' })
  .use(trackGlobalErrors())
  .use(openInEditor())
  .use(overlay())
  .use(asyncStorage())
  .use(networking())
  .use(reactotronRedux())
  .use(sagaPlugin())
  .useReactNative()
  .connect();

Reactotron.clear();

console.tron = Reactotron;

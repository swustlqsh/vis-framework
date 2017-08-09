/**
 * Created by qiushengli on 2017/6/27.
 */
import config from '../commons/config'
onmessage = (evt) => {
  let {data} = evt.data
  // 处理数据
  console.log(config)
  self.postMessage({data})
  self.close()
}

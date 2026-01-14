// Скрипт для массовой загрузки иллюстраций из Figma
// Использование: node scripts/download-illustrations.js
// 
// ВАЖНО: Этот скрипт требует ручного выполнения через MCP инструменты,
// так как для загрузки изображений нужен доступ к Figma API через MCP сервер

const fs = require('fs');
const path = require('path');

// Маппинг типов иллюстраций из Figma
// Формат: { nodeId, type, imageRef, needsCropping, cropTransform, filenameSuffix }
const illustrations = [
  { nodeId: '4947:16707', type: 'something-happened', imageRef: '8bf4aad79c64a4916192b30680326b81e7273227', needsCropping: false },
  { nodeId: '4947:16709', type: 'time-slot', imageRef: 'bdee57e2fd9a0202d34f128835221b637054b2b8', needsCropping: false },
  { nodeId: '4947:16711', type: 'self-esteem', imageRef: '2d238ff82f5793756aa660075df4abd37dded6a7', needsCropping: false },
  { nodeId: '4947:16713', type: 'working-calmly', imageRef: 'c344935966a921cb722f042e81e757a9a0351ee8', needsCropping: false },
  { nodeId: '4947:16715', type: 'test', imageRef: '3ed4bdf7d2a2511c544f68f3f8511b0b038cbee2', needsCropping: true, cropTransform: [[1.048588514328003, 0, -0.02621215209364891], [0, 1.048588514328003, -0.02343713492155075]], filenameSuffix: '25631f' },
  { nodeId: '4947:16717', type: 'past', imageRef: '945989f68e157500fc199369ab1e7c976e230cb2', needsCropping: false },
  { nodeId: '4947:16719', type: 'reactions', imageRef: 'b0af8e9b053c5757744202fac14e5b7149cda0f5', needsCropping: false },
  { nodeId: '4947:16721', type: 'self-help', imageRef: '377bdf9ba3c7791365b223c6089e727dd61d59a1', needsCropping: false },
  { nodeId: '4947:16723', type: 'take-on-challenges', imageRef: '14d3c416043453d9f3b7e3c7cd3f5d458e50ce6f', needsCropping: false },
  { nodeId: '4947:16725', type: 'see-a-therapist', imageRef: '8b1db33562b09ce3b92b7c8ce42dea089774682a', needsCropping: false },
  { nodeId: '4947:16727', type: 'payment-completed', imageRef: '571caa9bed8b0f6e4478d2fbeb2247a77f031287', needsCropping: false },
  { nodeId: '4947:16729', type: 'relax', imageRef: 'b10ff806cce8e481b508b37a7dae420e94b3ba5b', needsCropping: false },
  { nodeId: '4947:16731', type: 'aggression', imageRef: '994b403eaf40a8b167311db63d0a3fa21bf6c7a7', needsCropping: false },
  { nodeId: '4947:16733', type: 'self-knowledge', imageRef: 'e46062c9bae58d7c010fd370e4d2a18c95b5ffa3', needsCropping: false },
  { nodeId: '4947:16735', type: 'thanks-for-feedback', imageRef: '9c456f29b3e7a40dcddaa62dfd6c8663dcc5614d', needsCropping: false },
  { nodeId: '4947:16737', type: 'card-saved', imageRef: 'b32fa653b83efb09437093d371fa44049171dc62', needsCropping: false },
  { nodeId: '4947:16739', type: 'self-care', imageRef: '7e3c3219bc8d7e3baea0a69e5b57004bb06ac839', needsCropping: false },
  { nodeId: '4947:16741', type: 'therapist', imageRef: 'd3c0b91e18256760243689321c14e147f1339d1c', needsCropping: false },
  { nodeId: '4947:16743', type: 'payment-not-processed', imageRef: 'd0c615dfa9da2a74d94e04320179546629e75254', needsCropping: false },
  { nodeId: '4947:16745', type: 'emotions', imageRef: '5132c81e6fdd381fb310ea1721b977f41ff587f1', needsCropping: false },
  { nodeId: '4947:16747', type: 'enjoy-life-daily', imageRef: 'ceee3740ba5fe6758139e5b2aa1678eae7f2b86b', needsCropping: false },
  { nodeId: '4947:16749', type: 'want-to-grow', imageRef: '4e708a7fa8b22ce1709bc0f217156b202c1ccb38', needsCropping: false },
  { nodeId: '4947:16751', type: 'couch', imageRef: '4dae4bc3c789c8978ef52cc93652645a032c662e', needsCropping: false },
  { nodeId: '39525:5760', type: 'meditation', imageRef: 'a1dbe05e35bd5dd3fced3275b4253f75f4af7886', needsCropping: true, cropTransform: [[0.7798363566398621, 0, 0.11697545647621155], [0, 0.7798363566398621, 0.10728645324707031]], filenameSuffix: '32d716' },
  { nodeId: '39526:5765', type: 'player', imageRef: '522ce6785fd078a248d007f99f16460c1ea83bf4', needsCropping: false },
  { nodeId: '41184:6411', type: 'burn-out', imageRef: '9723ab532bac47eee59d4da5e38f9563b48482d6', needsCropping: true, cropTransform: [[0.8140184879302979, 0, 0.10335131734609604], [0, 0.8140184879302979, -0.0802321657538414]], filenameSuffix: 'ec386a' },
  { nodeId: '41191:6430', type: 'aggression-level', imageRef: 'f07dc2def7b3ea09db59f7c10d03daf52dafbbb1', needsCropping: true, cropTransform: [[0.9194375872612, 0, 0.07355500757694244], [0, 0.9194375872612, -0.033997152000665665]], filenameSuffix: '281b92' },
  { nodeId: '41191:6448', type: 'depression', imageRef: 'd94ae19727e8b651f6c7a1521eddbb64b9d48ff7', needsCropping: true, cropTransform: [[0.8621698617935181, 0, 0.02860896661877632], [0, 0.8621698617935181, -0.06344683468341827]], filenameSuffix: '53ab09' },
  { nodeId: '42331:6427', type: 'type49', imageRef: '5a6ba73388de38beab5123219195d696966a39f7', needsCropping: true, cropTransform: [[0.7967100739479065, 0, 0.10448471456766129], [0, 0.7967100739479065, -0.0646100640296936]], filenameSuffix: '10ed20' },
  { nodeId: '41298:6414', type: 'building', imageRef: '5877b7e7a0a8da942bbd4feefaf8b3a2e809970a', needsCropping: true, cropTransform: [[0.8386403918266296, 0, 0.09683055430650711], [0, 0.8386403918266296, -0.06723512709140778]], filenameSuffix: '19106c' },
  { nodeId: '41691:6416', type: 'skills', imageRef: '176fbbe7158b937fcfd3d94988822a5b7ffa4150', needsCropping: true, cropTransform: [[0.8762246966362, 0, 0.07640117406845093], [0, 0.8762246966362, -0.05257348343729973]], filenameSuffix: 'c7387c' },
  { nodeId: '41833:6419', type: 'heart', imageRef: '3f7f425842f585f5d42bfd9cf81f17f01eb121b6', needsCropping: true, cropTransform: [[1.0135048627853394, 0, -0.003795487806200981], [0, 1.0135048627853394, 0.015202571637928486]], filenameSuffix: '173dea' },
  { nodeId: '41834:6440', type: 'tree', imageRef: '66addcc15a9fe64204bb851063198ab7d15dac1e', needsCropping: true, cropTransform: [[0.8169559836387634, 0, 0.07375811040401459], [0, 0.8169559836387634, -0.06050058454275131]], filenameSuffix: '57ceaf' },
  { nodeId: '41835:6445', type: 'battery', imageRef: 'b70a6e8ddd44a1a0eee4781b35d8fd58beca2a1e', needsCropping: true, cropTransform: [[0.9470199942588806, 0, 0.039043694734573364], [0, 0.9470199942588806, -0.009470200166106224]], filenameSuffix: '22df1f' },
  { nodeId: '41946:6427', type: 'relax-meditation', imageRef: '899153d532f86dc797a89b3fc74b6bbcbda49471', needsCropping: true, cropTransform: [[0.9470199942588806, 0, 0.029856795445084572], [0, 0.9470199942588806, 0.02115279622375965]], filenameSuffix: '676e63' },
  { nodeId: '41946:6448', type: 'clock', imageRef: '88612eb05603f6cc932991d1ba9522945b6fbba8', needsCropping: true, cropTransform: [[0.9470199942588806, 0, 0.029856795445084572], [0, 0.9470199942588806, 0.02115279622375965]], filenameSuffix: '676e63' },
  { nodeId: '41946:6453', type: 'megaphone', imageRef: '1c98736102d091e61e5b4495dfbe5bc2a2b0d0a4', needsCropping: true, cropTransform: [[0.8562036752700806, 0, 0.07582482695579529], [0, 0.8562036752700806, -0.07370255887508392]], filenameSuffix: '2d5ccb' },
  { nodeId: '41946:6459', type: 'stones', imageRef: 'ce7b453750c69816a9b76f84f348e00503afeedd', needsCropping: true, cropTransform: [[0.7648059129714966, 0, 0.12095886468887329], [0, 0.7648059129714966, -0.08753082156181335]], filenameSuffix: '1991fa' },
  { nodeId: '41946:6464', type: 'before-conversation', imageRef: 'f5cb36639bf6145840a6695ea687389716f0e417', needsCropping: true, cropTransform: [[0.9411050081253052, 0, 0.03372608870267868], [0, 0.9411050081253052, -0.03758344426751137]], filenameSuffix: '51eebd' },
  { nodeId: '41946:6469', type: 'laptop-fire', imageRef: '04db718cd275ffaf834c2985c54c9f8594379f0b', needsCropping: true, cropTransform: [[0.8361861705780029, 0, 0.09024564921855927], [0, 0.8361861705780029, -0.046788908541202545]], filenameSuffix: '788001' },
  { nodeId: '42067:6474', type: 'overloaded', imageRef: '14fa9c08fd64f51a018e6458e74c1a6af3a231ae', needsCropping: true, cropTransform: [[0.8361861705780029, 0, 0.07209580391645432], [0, 0.8361861705780029, -0.03468900918960571]], filenameSuffix: '1224bd' },
  { nodeId: '42075:6441', type: 'deep-relax', imageRef: 'b147734528576cfa9c853d348e63224140b01cea', needsCropping: true, cropTransform: [[0.8469529747962952, 0, 0.08040786534547806], [0, 0.8469529747962952, -0.03702710196375847]], filenameSuffix: 'ee43d6' },
  { nodeId: '42075:6458', type: 'coffee-relax', imageRef: 'b7524b4d6882a4a1c2748c234918f2e65c6fec24', needsCropping: true, cropTransform: [[0.8469529747962952, 0, 0.11565256863832474], [0, 0.8469529747962952, -0.04444703832268715]], filenameSuffix: '51d854' },
  { nodeId: '42124:6441', type: 'sandclock', imageRef: '773a39a7ddc7a6ea2e4a3803c1232f2f799cbc31', needsCropping: true, cropTransform: [[0.7321033477783203, 0, 0.12445756047964096], [0, 0.7321033477783203, -0.11499547213315964]], filenameSuffix: '2e284c' },
  { nodeId: '42124:6458', type: 'earphones', imageRef: '31d97c980fa3a4473152c36656f2bb0ea1728775', needsCropping: true, cropTransform: [[0.8590529561042786, 0, 0.07651811093091965], [0, 0.8590529561042786, -0.0851651132106781]], filenameSuffix: 'cd54cf' },
  { nodeId: '42291:7027', type: 'hugs-himself', imageRef: 'fce43c405becc0b4d96a36510f1cc5b657d359d7', needsCropping: true, cropTransform: [[0.755245566368103, 0, 0.12194965779781342], [0, 0.755245566368103, -0.12189613282680511]], filenameSuffix: '5a2cae' },
  { nodeId: '42291:7042', type: 'puzzles', imageRef: 'a0ab1e3e9cafce253eabe79cda01076ededff383', needsCropping: true, cropTransform: [[0.9696744084358215, 0, 0.017500603571534157], [0, 0.9696744084358215, -0.026092180982232094]], filenameSuffix: '34756d' },
  { nodeId: '42291:7043', type: 'holding-sun', imageRef: '74111efdb55ff46275d4512d8cff882735cb34e0', needsCropping: true, cropTransform: [[0.9696744084358215, 0, 0.017500603571534157], [0, 0.9696744084358215, -0.026092180982232094]], filenameSuffix: '34756d' },
  { nodeId: '42334:6442', type: 'emotions-level-orange', imageRef: '7b24e3b6c9e6d6e519f2e83a5bf1a96c44604b10', needsCropping: true, cropTransform: [[0.7975953817367554, 0, 0.1027052029967308], [0, 0.7975953817367554, -0.0669730082154274]], filenameSuffix: '185255' },
  { nodeId: '42458:6474', type: 'question', imageRef: 'efeeffb8c020b2ff4e8f2df892267fc005c016fb', needsCropping: true, cropTransform: [[0.9100549817085266, 0, 0.03307410702109337], [0, 0.9100549817085266, -0.030099505558609962]], filenameSuffix: '62368f' },
  { nodeId: '42458:6491', type: 'thoughts', imageRef: '186371b8aea4a968e6d792d64e23576bb5c48f34', needsCropping: true, cropTransform: [[0.8804124593734741, 0, 0.05623706802725792], [0, 0.8804124593734741, -0.061127595603466034]], filenameSuffix: '54d165' },
  { nodeId: '42520:6478', type: 'party', imageRef: 'be840bb146cc26970a000317f2c1c7077229d550', needsCropping: true, cropTransform: [[1.0787835121154785, 0, -0.043749865144491196], [0, 1.0787835121154785, -0.037757426500320435]], filenameSuffix: '6c7823' },
  { nodeId: '42520:6495', type: 'okay', imageRef: '48f7c5054573f3966b9471ff16d6807eb3628a31', needsCropping: true, cropTransform: [[1.2023844718933105, 0, -0.08633184432983398], [0, 1.2023844718933105, -0.09444119036197662]], filenameSuffix: 'ecf91d' },
  { nodeId: '42520:6497', type: 'phone', imageRef: 'ef20044c7e02dbdb7225a6b5637af1e30766a0bb', needsCropping: true, cropTransform: [[1.0457148551940918, 0, -0.01434335671365261], [0, 1.0457148551940918, 0.019832275807857513]], filenameSuffix: '4649bd' },
  { nodeId: '43470:7447', type: 'empty-search', imageRef: 'd3844465c0d51edbb86cec9b48ce97130d63b154', needsCropping: true, cropTransform: [[0.8835634589195251, 0, 0.04668901115655899], [0, 0.8835634589195251, -0.004417817573994398]], filenameSuffix: '28f844' },
];

const illustrationsDir1x = path.join(__dirname, '../public/illustrations/1x');
const illustrationsDir2x = path.join(__dirname, '../public/illustrations/2x');

if (!fs.existsSync(illustrationsDir1x)) {
  fs.mkdirSync(illustrationsDir1x, { recursive: true });
}

if (!fs.existsSync(illustrationsDir2x)) {
  fs.mkdirSync(illustrationsDir2x, { recursive: true });
}

console.log(`Подготовлено ${illustrations.length} иллюстраций для загрузки`);
console.log(`Папки созданы: ${illustrationsDir1x} и ${illustrationsDir2x}`);
console.log('\nДля загрузки изображений используйте MCP инструмент download_figma_images');
console.log('Пример использования:');
illustrations.slice(0, 3).forEach(ill => {
  console.log(`\n- ${ill.type}:`);
  console.log(`  nodeId: ${ill.nodeId}`);
  console.log(`  imageRef: ${ill.imageRef}`);
  console.log(`  needsCropping: ${ill.needsCropping}`);
  if (ill.needsCropping) {
    console.log(`  filenameSuffix: ${ill.filenameSuffix}`);
  }
});

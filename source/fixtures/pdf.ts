import { faker } from '@faker-js/faker'

const PDFs = [
  'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  'https://www.africau.edu/images/default/sample.pdf',
  'https://www.orimi.com/pdf-test.pdf',
  'https://bayes.wustl.edu/etj/articles/random.pdf',
  'https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf',
  'https://api.ngo.pl/media/get/108219',
  'https://buildmedia.readthedocs.org/media/pdf/random/latest/random.pdf',
  'http://www.pdf995.com/samples/pdf.pdf',
  'https://www.clickdimensions.com/links/TestPDFfile.pdf',
  'https://www.rand.org/content/dam/rand/pubs/monograph_reports/MR1418/MR1418.deviates.pdf',
  'https://teorica.fis.ucm.es/ft8/tablern2.pdf',
  'http://www.eirene.de/Devroye.pdf',
]

export const randomPDF = (): string => {
  const randomIndex = faker.datatype.number({ min: 0, max: PDFs.length - 1, precision: 1 })
  return PDFs[randomIndex]
}

import React, { type FC } from 'react'

import { type Meta } from '@storybook/react'

import { Select, type SelectNS } from '..'
import { faker } from '@faker-js/faker'

export default {
  title: 'Data Entry/Select',
  component: Select,
  args: {
    label: 'پلی گروند',
    placeholder: 'سلکت موجود در پلی گروند',
    state: ['warning', 'some message'],
    searchPlaceholder: 'جستجو بین موارد',
  },
} as Meta<typeof Select>

export const Playground: FC<SelectNS.Props> = props => {
  return (
    <div style={{ width: '100%', height: '90vh' }}>
      {/* <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero, odit. Mollitia explicabo
        architecto modi, dolorum provident sit sed, culpa voluptates inventore tempore eaque dolor
        quos possimus animi illo est hic. Reprehenderit aperiam distinctio, necessitatibus omnis
        quam vero. Nisi modi delectus nulla mollitia ad totam numquam officiis, deserunt minima
        veniam debitis tenetur beatae vero optio, autem dolor atque officia ab in? Quo cupiditate
        explicabo libero! Minus quae necessitatibus unde hic, velit iure incidunt deserunt dicta
        amet, ea sit quas nostrum iusto excepturi nihil beatae vitae voluptate laboriosam sequi esse
        sed! Expedita. Blanditiis assumenda quibusdam veniam, optio dolores voluptas laborum
        deserunt voluptate animi debitis ipsa omnis veritatis est iusto dolore illo, modi
        repellendus et? Animi, ex. Magnam quae deserunt vitae repellendus voluptatibus? Nesciunt
        quisquam quaerat odio sed molestiae, hic illum possimus animi fugiat veritatis, autem, ea
        velit nihil incidunt eligendi debitis fugit? Enim porro pariatur earum minus vero vel nulla
        quidem assumenda? Ullam suscipit illum qui fugit nam voluptatibus facilis odio consequatur
        rerum minus reiciendis ex, mollitia expedita natus praesentium dolorem corporis aperiam ipsa
        rem deserunt ut! Recusandae asperiores maiores aspernatur fugiat? Vel animi quibusdam
        voluptate ullam dignissimos. Accusamus iste sunt necessitatibus reiciendis! Culpa nesciunt
        labore libero, nisi, inventore obcaecati omnis adipisci nulla, dignissimos tempora vero
        nihil corrupti fuga voluptate saepe at! Natus sunt voluptatibus odit quis necessitatibus
        quod nisi dicta esse, tempore facere aperiam laudantium dolorem! Natus accusantium ullam
        corrupti esse rem quo soluta sit! Quo, labore! Quibusdam eos architecto cupiditate?
        Similique, nobis temporibus. Quos laborum ad dolor numquam in nemo quisquam quae, nulla
        possimus recusandae reiciendis, magnam, dicta molestias nihil beatae. Incidunt sit error
        fugiat dignissimos quo in, odit eveniet! Quasi, incidunt. Facilis, facere ad. Aliquid
        reprehenderit fugiat tenetur eaque ipsa aspernatur aut sequi hic modi accusantium nisi, iure
        velit dolores inventore repellat repudiandae debitis unde similique deserunt perferendis.
        Officiis. Neque beatae vero cum placeat unde nisi aliquam similique id nesciunt rem quis
        ipsum quam inventore minus nihil assumenda ea, ipsam perspiciatis consectetur officiis
        facilis praesentium, tempora cumque? Explicabo, ut? Nostrum deleniti dolorem ut possimus
        dolor sit libero corrupti recusandae aperiam laudantium! Eligendi et eius praesentium minima
        adipisci quo reiciendis! Explicabo nihil aut libero? Minus et hic iste iusto. Adipisci?
        Atque laboriosam dolorum, facilis veniam velit aut unde optio vero repellat libero
        voluptatem incidunt doloremque fuga harum non sapiente ipsam quia quaerat dolore perferendis
        qui eligendi? Ex sapiente neque beatae? Quibusdam nam est asperiores? Quos est maxime sit.
        Quidem odio deleniti rerum repudiandae facere, accusantium magnam eligendi voluptatem quae
        natus, deserunt, ut iure ipsa dolorem laboriosam ullam earum quam fugit! Et fuga cupiditate
        veniam ipsam accusamus minima esse officia autem totam sint, deserunt repellat labore
        facilis. Possimus beatae voluptatum tempore voluptas nulla veniam nemo eveniet adipisci
        consectetur, fugiat at dignissimos. Expedita fugiat similique aspernatur, consequuntur
        sapiente commodi voluptatum est aliquid sunt obcaecati reiciendis recusandae dolor eveniet
        quos id illum quaerat? Delectus assumenda ea ipsa ab expedita repellat odio eum officiis.
        Eligendi, consectetur eum! Perferendis sint illum numquam suscipit saepe maxime obcaecati
        quidem accusamus? Amet voluptatum quos possimus reprehenderit vitae officiis ad non
        inventore, nihil voluptas unde at nobis libero debitis. Officia dolores eaque voluptate ut
        doloribus, quaerat fugiat velit unde veritatis eos, corporis minima. Temporibus magni
        mollitia distinctio nobis amet, harum, sequi unde id aut ipsa, minima deleniti! Nemo,
        corrupti. Perspiciatis iusto modi eius laboriosam error. Optio cum iste hic magnam ullam at
        beatae est non officia nulla voluptate, quis suscipit. Illo iste repellat optio voluptatum!
        Labore asperiores minima ut? Nemo repellendus temporibus natus ea consequatur veritatis
        harum dolores illo ut sequi, asperiores cum libero et minima esse quidem deserunt tenetur
        facere vero accusantium aliquam iure voluptas cupiditate commodi? Repellendus! Tenetur
        repellendus deleniti optio. Numquam iste commodi dolor quis, minima, blanditiis aut autem
        velit possimus esse reiciendis perspiciatis porro nostrum! Pariatur assumenda ex facere
        obcaecati corporis incidunt id rerum soluta? Tempore, tempora. Debitis quasi tenetur
        laborum, exercitationem magnam saepe delectus minus vitae pariatur ducimus voluptas earum
        soluta nulla, iusto dolorum alias odit enim. Porro, dolore. Eius voluptatum exercitationem
        maxime iste! Beatae amet porro, tempore quas sed alias dolorum neque vitae iste odio totam
        nostrum laudantium saepe, molestias harum, asperiores odit! Molestiae obcaecati in eum,
        pariatur aliquam amet nulla ullam eveniet? Voluptatem molestias, recusandae illo facere
        veniam odio quasi. Optio ex accusamus ducimus blanditiis culpa, cum rem porro asperiores
        ipsam repudiandae quod eos saepe officiis reprehenderit accusantium iure aspernatur quia.
        Voluptates. Ducimus accusamus eius minus pariatur velit exercitationem repudiandae dicta
        laborum quidem at modi, quo consequuntur sunt provident consectetur dignissimos nisi qui est
        nobis, perferendis labore quaerat. Laborum possimus cum est? Id amet nisi veniam. Iste
        voluptates sint, dolore rem et ratione quo ipsa illum commodi voluptatem vitae modi
        consequuntur, minima eligendi nisi nulla. Molestias laborum est, consequatur eveniet modi
        libero. Assumenda corrupti error est illum itaque. Ex ab incidunt nulla reprehenderit
        distinctio qui. Qui doloremque quaerat accusamus hic. Modi cupiditate quos suscipit dicta
        architecto voluptates nisi ea quod voluptas maxime. Sunt eos beatae dolorem voluptatibus
        quidem commodi nam harum autem, omnis fuga assumenda provident vel nihil, soluta in eveniet
        necessitatibus enim. Corrupti exercitationem asperiores consectetur consequuntur quos harum,
        ipsam vero? Nihil nostrum neque sapiente nulla voluptatibus ex, iste ipsum! Et facere
        repellat facilis, doloremque dolore ipsa ab atque autem reprehenderit sapiente quis aut fuga
        quod saepe inventore. Iusto, expedita sequi! Numquam id iusto optio quas corrupti!
        Perferendis voluptas nemo asperiores vitae ipsam aliquam sit odio a unde. Voluptates
        mollitia quasi itaque aliquid deleniti sit laboriosam id animi. Eligendi, facilis officia!
      </p> */}

      <Select
        label="پلی گروند"
        placeholder="سلکت موجود در پلی گروند"
        state={['warning', 'some message']}
        searchPlaceholder="جستجو بین موارد"
        multiSelect
        options={Array.from(Array(200)).map((_, index) => ({
          value: index,
          label: faker.person.firstName(),
          data: { lastName: faker.person.lastName() },
        }))}
        renderSelectedOption={option => option.label + ' ' + option.data?.lastName}
        // onWrite={value => console.log(value)}
        // onChange={option => console.log(option)}
      >
        {option => option.label + ' ' + option.data?.lastName}
      </Select>

      {/* <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero, odit. Mollitia explicabo
        architecto modi, dolorum provident sit sed, culpa voluptates inventore tempore eaque dolor
        quos possimus animi illo est hic. Reprehenderit aperiam distinctio, necessitatibus omnis
        quam vero. Nisi modi delectus nulla mollitia ad totam numquam officiis, deserunt minima
        veniam debitis tenetur beatae vero optio, autem dolor atque officia ab in? Quo cupiditate
        explicabo libero! Minus quae necessitatibus unde hic, velit iure incidunt deserunt dicta
        amet, ea sit quas nostrum iusto excepturi nihil beatae vitae voluptate laboriosam sequi esse
        sed! Expedita. Blanditiis assumenda quibusdam veniam, optio dolores voluptas laborum
        deserunt voluptate animi debitis ipsa omnis veritatis est iusto dolore illo, modi
        repellendus et? Animi, ex. Magnam quae deserunt vitae repellendus voluptatibus? Nesciunt
        quisquam quaerat odio sed molestiae, hic illum possimus animi fugiat veritatis, autem, ea
        velit nihil incidunt eligendi debitis fugit? Enim porro pariatur earum minus vero vel nulla
        quidem assumenda? Ullam suscipit illum qui fugit nam voluptatibus facilis odio consequatur
        rerum minus reiciendis ex, mollitia expedita natus praesentium dolorem corporis aperiam ipsa
        rem deserunt ut! Recusandae asperiores maiores aspernatur fugiat? Vel animi quibusdam
        voluptate ullam dignissimos. Accusamus iste sunt necessitatibus reiciendis! Culpa nesciunt
        labore libero, nisi, inventore obcaecati omnis adipisci nulla, dignissimos tempora vero
        nihil corrupti fuga voluptate saepe at! Natus sunt voluptatibus odit quis necessitatibus
        quod nisi dicta esse, tempore facere aperiam laudantium dolorem! Natus accusantium ullam
        corrupti esse rem quo soluta sit! Quo, labore! Quibusdam eos architecto cupiditate?
        Similique, nobis temporibus. Quos laborum ad dolor numquam in nemo quisquam quae, nulla
        possimus recusandae reiciendis, magnam, dicta molestias nihil beatae. Incidunt sit error
        fugiat dignissimos quo in, odit eveniet! Quasi, incidunt. Facilis, facere ad. Aliquid
        reprehenderit fugiat tenetur eaque ipsa aspernatur aut sequi hic modi accusantium nisi, iure
        velit dolores inventore repellat repudiandae debitis unde similique deserunt perferendis.
        Officiis. Neque beatae vero cum placeat unde nisi aliquam similique id nesciunt rem quis
        ipsum quam inventore minus nihil assumenda ea, ipsam perspiciatis consectetur officiis
        facilis praesentium, tempora cumque? Explicabo, ut? Nostrum deleniti dolorem ut possimus
        dolor sit libero corrupti recusandae aperiam laudantium! Eligendi et eius praesentium minima
        adipisci quo reiciendis! Explicabo nihil aut libero? Minus et hic iste iusto. Adipisci?
        Atque laboriosam dolorum, facilis veniam velit aut unde optio vero repellat libero
        voluptatem incidunt doloremque fuga harum non sapiente ipsam quia quaerat dolore perferendis
        qui eligendi? Ex sapiente neque beatae? Quibusdam nam est asperiores? Quos est maxime sit.
        Quidem odio deleniti rerum repudiandae facere, accusantium magnam eligendi voluptatem quae
        natus, deserunt, ut iure ipsa dolorem laboriosam ullam earum quam fugit! Et fuga cupiditate
        veniam ipsam accusamus minima esse officia autem totam sint, deserunt repellat labore
        facilis. Possimus beatae voluptatum tempore voluptas nulla veniam nemo eveniet adipisci
        consectetur, fugiat at dignissimos. Expedita fugiat similique aspernatur, consequuntur
        sapiente commodi voluptatum est aliquid sunt obcaecati reiciendis recusandae dolor eveniet
        quos id illum quaerat? Delectus assumenda ea ipsa ab expedita repellat odio eum officiis.
        Eligendi, consectetur eum! Perferendis sint illum numquam suscipit saepe maxime obcaecati
        quidem accusamus? Amet voluptatum quos possimus reprehenderit vitae officiis ad non
        inventore, nihil voluptas unde at nobis libero debitis. Officia dolores eaque voluptate ut
        doloribus, quaerat fugiat velit unde veritatis eos, corporis minima. Temporibus magni
        mollitia distinctio nobis amet, harum, sequi unde id aut ipsa, minima deleniti! Nemo,
        corrupti. Perspiciatis iusto modi eius laboriosam error. Optio cum iste hic magnam ullam at
        beatae est non officia nulla voluptate, quis suscipit. Illo iste repellat optio voluptatum!
        Labore asperiores minima ut? Nemo repellendus temporibus natus ea consequatur veritatis
        harum dolores illo ut sequi, asperiores cum libero et minima esse quidem deserunt tenetur
        facere vero accusantium aliquam iure voluptas cupiditate commodi? Repellendus! Tenetur
        repellendus deleniti optio. Numquam iste commodi dolor quis, minima, blanditiis aut autem
        velit possimus esse reiciendis perspiciatis porro nostrum! Pariatur assumenda ex facere
        obcaecati corporis incidunt id rerum soluta? Tempore, tempora. Debitis quasi tenetur
        laborum, exercitationem magnam saepe delectus minus vitae pariatur ducimus voluptas earum
        soluta nulla, iusto dolorum alias odit enim. Porro, dolore. Eius voluptatum exercitationem
        maxime iste! Beatae amet porro, tempore quas sed alias dolorum neque vitae iste odio totam
        nostrum laudantium saepe, molestias harum, asperiores odit! Molestiae obcaecati in eum,
        pariatur aliquam amet nulla ullam eveniet? Voluptatem molestias, recusandae illo facere
        veniam odio quasi. Optio ex accusamus ducimus blanditiis culpa, cum rem porro asperiores
        ipsam repudiandae quod eos saepe officiis reprehenderit accusantium iure aspernatur quia.
        Voluptates. Ducimus accusamus eius minus pariatur velit exercitationem repudiandae dicta
        laborum quidem at modi, quo consequuntur sunt provident consectetur dignissimos nisi qui est
        nobis, perferendis labore quaerat. Laborum possimus cum est? Id amet nisi veniam. Iste
        voluptates sint, dolore rem et ratione quo ipsa illum commodi voluptatem vitae modi
        consequuntur, minima eligendi nisi nulla. Molestias laborum est, consequatur eveniet modi
        libero. Assumenda corrupti error est illum itaque. Ex ab incidunt nulla reprehenderit
        distinctio qui. Qui doloremque quaerat accusamus hic. Modi cupiditate quos suscipit dicta
        architecto voluptates nisi ea quod voluptas maxime. Sunt eos beatae dolorem voluptatibus
        quidem commodi nam harum autem, omnis fuga assumenda provident vel nihil, soluta in eveniet
        necessitatibus enim. Corrupti exercitationem asperiores consectetur consequuntur quos harum,
        ipsam vero? Nihil nostrum neque sapiente nulla voluptatibus ex, iste ipsum! Et facere
        repellat facilis, doloremque dolore ipsa ab atque autem reprehenderit sapiente quis aut fuga
        quod saepe inventore. Iusto, expedita sequi! Numquam id iusto optio quas corrupti!
        Perferendis voluptas nemo asperiores vitae ipsam aliquam sit odio a unde. Voluptates
        mollitia quasi itaque aliquid deleniti sit laboriosam id animi. Eligendi, facilis officia!
      </p> */}
    </div>
  )
}

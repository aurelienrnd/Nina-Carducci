(function($) {
  $.fn.mauGallery = function(options) {

    var options = $.extend($.fn.mauGallery.defaults, options);
    var tagsCollection = []; // data list des IMG a afficher dans la gallery

    return this.each(function() {
      //Cree une Div .gallery-items-row
      $.fn.mauGallery.methods.createRowWrapper($(this));

      //Cree la modal
      if (options.lightBox) {
        $.fn.mauGallery.methods.createLightBox($(this), options.lightboxId, options.navigation);
      }
      
      // Listeners
      $.fn.mauGallery.listeners(options);

      // Pour chaque <img> dans .gallery,
      $(this).children(".gallery-item").each(function(index) { 
        //Ajout de la class img-fluid
        $.fn.mauGallery.methods.responsiveImageItem($(this)); 
        //Ajout a la Div .gallery-items-row
        $.fn.mauGallery.methods.moveItemInRowWrapper($(this));
        //et le wrap dans une Div .item-column
        $.fn.mauGallery.methods.wrapItemInColumn($(this), options.columns);

        // recuperation de la data gallery-tag de chaque IMG
        var theTag = $(this).data("gallery-tag");

        //si tag n'est pas deja dans le tableaux tagsCollection, je l'ajoute
        if (options.showTags && theTag !== undefined && tagsCollection.indexOf(theTag) === -1) {
          tagsCollection.push(theTag);
        }
      });

      //ajoute des boutons de filtre
      if (options.showTags) {
        $.fn.mauGallery.methods.showItemTags($(this), options.tagsPosition, tagsCollection);
      }

      //je cache tout les .item-column
      $(this).fadeIn(500);
    });
  };





  /********** Paramaitre par defaut **********/

  $.fn.mauGallery.defaults = {
    columns: 3,
    lightBox: true,
    lightboxId: null,
    showTags: true,
    tagsPosition: "bottom",
    navigation: true
  };







  /********** Listener **********/
  $.fn.mauGallery.listeners = function(options) {

    // Listener pour ouvrir la modal
    $(".gallery-item").on("click", function() {
      if (options.lightBox && $(this).prop("tagName") === "IMG") {
        $.fn.mauGallery.methods.openLightBox($(this), options.lightboxId);
      } else {
        return;
      }
    });

    // Listener pour les filtres
    $(".gallery").on("click", ".nav-link", $.fn.mauGallery.methods.filterByTag);

    // Listener pour les boutons de navigation
    $(".gallery").on("click", ".mg-prev", () =>
      $.fn.mauGallery.methods.prevImage(options.lightboxId)
    );
    $(".gallery").on("click", ".mg-next", () =>
      $.fn.mauGallery.methods.nextImage(options.lightboxId)
    );
  };







  /********** Fonctions **********/
  $.fn.mauGallery.methods = {

    /** Cree une Div .gallery-items-row dans element
     * @param {HTMLElement} element
    */
    createRowWrapper(element) {
      // Veriffie ci l'element existe et le creer ci il n'existe pas
      if (!element.children().first().hasClass("row")) {
        element.append('<div class="gallery-items-row row"></div>');
      }
    },

    /** Wrap un element dans une Div .item-column
     * @param {HTMLElement} element
     * @param {Object} columns
    */
    wrapItemInColumn(element, columns) {
      // si columns est un nombre, je le wrap dans une div item-column
      if (columns.constructor === Number) {
        element.wrap(
          `<div class='item-column mb-4 col-${Math.ceil(12 / columns)}'></div>`
        );
      } 

      // si columns est un objet, pour chaque propriete de columns si elle existe je luis creer une class col- puis je l'ajoute a la div
      else if (columns.constructor === Object) {
        var columnClasses = "";
        if (columns.xs) {
          columnClasses += ` col-${Math.ceil(12 / columns.xs)}`;
        }
        if (columns.sm) {
          columnClasses += ` col-sm-${Math.ceil(12 / columns.sm)}`;
        }
        if (columns.md) {
          columnClasses += ` col-md-${Math.ceil(12 / columns.md)}`;
        }
        if (columns.lg) {
          columnClasses += ` col-lg-${Math.ceil(12 / columns.lg)}`;
        }
        if (columns.xl) {
          columnClasses += ` col-xl-${Math.ceil(12 / columns.xl)}`;
        }
        element.wrap(`<div class='item-column mb-4${columnClasses}'></div>`);
      } 
      
      // si columns n'est pas un nombre ou un objet, console.error
      else {
        console.error(
          `Columns should be defined as numbers or objects. ${typeof columns} is not supported.`
        );
      }
    },

    /** Ajout element a .gallery-items-row 
     * @param {HTMLElement} element 
    */
    moveItemInRowWrapper(element) {
      element.appendTo(".gallery-items-row");
    },

    /** Ajout de la class img-fluid a element
     * @param {HTMLElement} element
    */
    responsiveImageItem(element) {
      if (element.prop("tagName") === "IMG") {
        //si l'element est une image, je lui ajoute la class img-fluid
        element.addClass("img-fluid");
      }
    },

    /** Affiche ou masque la modal
     * @param {HTMLElement} element
     * @param {String} lightboxId 
     */
    openLightBox(element, lightboxId) {
      // Recherche la balise IMG dans la modal est lui attribue le bon url avant d'ouvrir la modal
      $(`#${lightboxId}`).find(".lightboxImage").attr("src", element.attr("src"));
      $(`#${lightboxId}`).modal("toggle");
    },

    /** Filtre les image et init l'image pre
     * 
    */
    prevImage() {
      let activeImage = null;
      // pour chaque image de la galerie, si une image === l'image de la modal alors activeImage = cette image
      $("img.gallery-item").each(function() {
        if ($(this).attr("src") === $(".lightboxImage").attr("src")) {
          activeImage = $(this);
        }
      });

      let activeTag = $(".tags-bar span.active-tag").data("images-toggle");
      let imagesCollection = [];
      // si le btn filtre all est activer, j'ajoute chaque .item-column au tableaux imagesCollection
      if (activeTag === "all") {
        $(".item-column").each(function() {
          if ($(this).children("img").length) {
            imagesCollection.push($(this).children("img"));
          }
        });
      } 
      // si non un autre btn filtre est activer, alors si le btn data tag === au img data tag de .item-column, je le rajoute au tableaux imagesCollection 
      else {
        $(".item-column").each(function() {
          if ($(this).children("img").data("gallery-tag") === activeTag) {
            imagesCollection.push($(this).children("img"));
          }
        });
      }

      let index = 0,
        next = null;
      // pour chaque image de imagesCollection, si l'image active est egal a l'image de l'index i, je set l'index a i
      $(imagesCollection).each(function(i) {
        if ($(activeImage).attr("src") === $(this).attr("src")) {
          index = i-1; //AJOUT DE -1 POUR CORRIGER LE BUG IMG PRECEDENTE
        }
      });

      // set next a l'image suivante de l'index i ou a la derniere image de la collection et j'attribue l'attribut src de next a .lightboxImage
      next = imagesCollection[index] || imagesCollection[imagesCollection.length - 1];
      $(".lightboxImage").attr("src", $(next).attr("src"));
    },

    /** Filtre les image et init l'image suiv
     * 
    */
    nextImage() {
      let activeImage = null;
      // pour chaque image de la galerie, si img.gallery-item === .lightboxImage , activeImage = img.gallery-item
      $("img.gallery-item").each(function() {
        if ($(this).attr("src") === $(".lightboxImage").attr("src")) {
          activeImage = $(this);
        }
      });

      let activeTag = $(".tags-bar span.active-tag").data("images-toggle");
      let imagesCollection = [];
      // si activeTag egal 'all', j'ajoute chaque .item-column au tableaux imagesCollection
      if (activeTag === "all") {
        $(".item-column").each(function() {
          if ($(this).children("img").length) {
            imagesCollection.push($(this).children("img"));
          }
        });
      } 
      // autrement, j'ajoute chaque .item-column qui a la meme img data-gallery-tag que activeTag au tableaux imagesCollection
      else {
        $(".item-column").each(function() {
          if ($(this).children("img").data("gallery-tag") === activeTag) {
            imagesCollection.push($(this).children("img"));
          }
        });
      }

      let index = 0,
        next = null;
      // pour chaque image de imagesCollection, si l'image active est egal a l'image de l'index i, je set l'index a i
      $(imagesCollection).each(function(i) {
        if ($(activeImage).attr("src") === $(this).attr("src")) {
          index = i+1; //AJOUT DE +1 POUR CORRIGER LE BUG IMG 
        }
      });

      // set next a l'image suivante de l'index i ou a la premiere image de la collection et j'attribue l'attribut src de next a .lightboxImage
      next = imagesCollection[index] || imagesCollection[0];
      $(".lightboxImage").attr("src", $(next).attr("src"));
    },

    /** Cree la modal
     * @param {HTMLElement} gallery
     * @param {String} lightboxId
     * @param {Boolean} navigation
    */
    createLightBox(gallery, lightboxId, navigation) {
      // Ajoute la modal a la galerie
      gallery.append(`
        <div class="modal fade" id="${lightboxId ? lightboxId : "galleryLightbox"}" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-body">
                ${navigation // si navigation est true, j'ajoute les boutons de navigation sinon je n'ajoute rien
                  ? '<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;"><</div>'
                  : '<span style="display:none;" />'
                }
                <img class="lightboxImage img-fluid" alt="Contenu de l'image affichée dans la modale au clique"/>
                ${navigation // si navigation est true, j'ajoute les boutons de navigation sinon je n'ajoute rien
                  ? '<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;}">></div>'
                  : '<span style="display:none;" />'
                }
              </div>
            </div>
          </div>
        </div>`
      );
    },

    /** Creer les bouton de filtre
     * @param {HTMLElement} gallery
     * @param {String} position
     * @param {Array} tags
    */
    showItemTags(gallery, position, tags) {
      // creation du bouton de filtre Tous, et incrementation de sa data = "all"
      var tagItems = '<li class="nav-item"><span class="nav-link active active-tag"  data-images-toggle="all">Tous</span></li>';
      // creation des autre bouton filtre et incrementation de leur data = tag[i].value
      $.each(tags, function(index, value) {
        tagItems += `<li class="nav-item active"><span class="nav-link"  data-images-toggle="${value}">${value}</span></li>`;
      });
      // isserssion des bouton de filtre dans une ul
      var tagsRow = `<ul class="my-4 tags-bar nav nav-pills">${tagItems}</ul>`;

      // Ajout des bouton de filtre en haut ou en bas de la galerie
      if (position === "bottom") {
        gallery.append(tagsRow);
      } else if (position === "top") {
        gallery.prepend(tagsRow);
      } else {
        console.error(`Unknown tags position: ${position}`);
      }
    },

    /** Filtre les image
     * 
    */
    filterByTag() {
      // si le bouton est deja actif, je ne fais rien
      if ($(this).hasClass("active-tag")) {
        return;
      }

      // je retire la class active-tag de l'element actif et je l'ajoute a l'element cliquer
      $(".active-tag").removeClass("active active-tag");
      $(this).addClass("active active-tag"); // AJOUT DE LA CLASSE ACTIVE POUR CORRECTION BUG (fond de couleur dorée)

      var tag = $(this).data("images-toggle");

      //je cache tout les .item-column
      $(".gallery-item").each(function() {
        $(this).parents(".item-column").hide();

        //si le tag est 'all', je montre tout les .item-column,
        if (tag === "all") {
          $(this).parents(".item-column").show(300);
        } 

        // autrement, je montre les .item-column qui ont le meme data-gallery-tag que le tag
        else if ($(this).data("gallery-tag") === tag) {
          $(this).parents(".item-column").show(300);
        }
      });
    }
  };
})(jQuery);

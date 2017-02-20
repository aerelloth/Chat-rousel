var timer;
var slider =
{
	$images_list : $('.slides>li'),
	imagesNumber : $('.slides>li').length,
	count : 0,
	pause : false,
	chrono : 3000,	//temps d'affichage d'une image
	startTimer : function() {
		clearInterval(timer);
		timer = setInterval(this.nextImage.bind(this), this.chrono);
		this.pause = false;
	},
	pauseTimer : function()
	{	
		clearInterval(timer);
		this.pause = true;
	},
	showImage : function()
	{
		correctSize();
		this.$images_list.hide();	//cacher toutes les images
		this.$images_list.eq(this.count).show();	//montrer l'image n° "count"
	},
	nextImage : function()
	{
		this.count++;	//incrémentation de "count"
		//retour au début après la dernière image
		if (this.count >= this.imagesNumber)
		{
			this.count = 0;
		}
		this.showImage();
	},
	prevImage : function()
	{
		this.count--;	//décrémentation de "count"
		//retour à la fin après la première image
		if (this.count < 0)
		{
			this.count = this.imagesNumber - 1;
		}
		this.showImage();
	},
	firstImage : function()
	{
		this.count = 0;
		this.showImage();
	},
	lastImage : function()
	{
		this.count = this.imagesNumber - 1;
		this.showImage();
	},
	init : function()
	{
		//lien des fonctions au clic sur les boutons
		$(".first").click(this.firstImage.bind(this));
		$(".previous").click(this.prevImage.bind(this));
		$(".pause").click(this.pauseTimer.bind(this));
		$(".play").click(this.startTimer.bind(this));
		$(".next").click(this.nextImage.bind(this));
		$(".last").click(this.lastImage.bind(this));
	}
}

function correctSize() {
	//correction de la hauteur de la fenêtre qui est calculée comme si toutes les images apparaissaient.
	var mainHeight = parseInt($("main").css('height'));
	var pictureHeight = parseInt($(".slider img").css('height'));
	//la hauteur est égale à la taille du main + celle d'une seule photo.
	$(".background").css('height', mainHeight - (slider.imagesNumber-1)*pictureHeight);
}

$(function()
{
	correctSize();
	slider.init();

// fonction de stop/start au clic : fait doublon avec le stop/start au survol.

/*	$(".slider").click(function() 
		{
			if (slider.pause == false)
				{
					slider.pauseTimer();
				}
			else
				{
					slider.startTimer();
				}
		});
*/

	//stop du défilement au survol de la photo
	$(".slider").mouseenter(function() 
		{
			slider.pauseTimer();
		});

	//redémarrage du défilement lorsque la souris quitte la photo
	$(".slider").mouseleave(function() 
		{
			slider.startTimer();
		});

	//lien des fonctions au clic sur les puces du diapo
	$(".circle").on('click', function()
	{
		//attribution de la photo à montrer grâce à l'attribut "data"
		slider.count = this.dataset.number;
		slider.showImage();
	});

	slider.firstImage();
	slider.startTimer();
})